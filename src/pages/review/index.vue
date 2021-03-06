<template>
  <div>
    <search-filter
      ref="searchFilter"
      :filter-tag-list="filterTagList"
      @clickFilter="moveToScreen('filter')"
      @clickSearch="clickSearch"
    />
    <div class="h-px bg-gray-200 mx-2" />
    <div class="w-screen overflow-y-scroll" :class="filterTagList.length>0?'review-list-2':'review-list'">
      <list-item
        :list-content="listContent"
        @clickDetail="clickDetail"
      />
      <client-only>
        <infinite-loading v-if="listContent.length" @infinite="scrolling">
          <div slot="no-results" />
          <div slot="no-more" />
        </infinite-loading>
      </client-only>
    </div>

    <full-screen
      v-model="screenFlag"
      :title="screenTitle"
      :ok-text="screenOkText"
      :side-btn-text="screenSideBtnText"
      :menu-list="myReview?['수정','삭제']:[]"
      class="bg-dark"
      @onClickMenu="onClickMenu"
      @onClickSideBtn="onClickSideBtn"
      @onClickBack="onClickBack"
      @onClickOk="onClickOk"
    >
      <filter-cont
        v-if="screenType === 'filter'"
        ref="filterCont"
        :screen-flag="screenFlag&&screenType==='filter'"
        :filter-tag-list="filterTagList"
        class="bg-dark-200"
      />
      <detail-cont
        v-if="screenType === 'detail'"
        :detail-content="detailContent"
      />
      <add-cont
        v-if="screenType === 'add'"
        ref="addCont"
        class="bg-dark-200"
        @afterAdd="afterAdd"
      />
      <modify-cont
        v-if="screenType === 'modify'"
        ref="modifyCont"
        :detail-content="detailContent"
        class="bg-dark-200"
        @afterModify="afterModify"
      />
    </full-screen>
    <write-btn content="글쓰기" @clickWriteBtn="moveToScreen('add')" />

    <confirm-modal
      :check-flag="modalFlag"
      :text="modalText"
      :ok-text="okText"
      :cancel-text="cancelText"
      @clickOk="clickOk"
      @clickCancel="clickCancel"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SearchFilter from '@/components/Review/SearchFilter/index';
import ListItem from '@/components/Review/listItem';
import DetailCont from '@/components/Review/detailCont';
import AddCont from '@/components/Review/addCont';
import ModifyCont from '@/components/Review/modifyCont';
import FilterCont from '@/components/Review/filterCont';
import FullScreen from '@/components/_Common/fullScreen';
import ConfirmModal from '@/components/Review/confirmModal';
import WriteBtn from '@/components/_Common/writeBtn';

export default {
  name: 'Review',
  components: {
    ConfirmModal,
    SearchFilter,
    ListItem,
    FullScreen,
    DetailCont,
    AddCont,
    FilterCont,
    ModifyCont,
    WriteBtn,
  },
  data () {
    return {
      currentPage: 0,
      listContent: [],
      modalText: '',
      modalFlag: false,
      okText: null,
      cancelText: null,
      screenType: null,
      screenFlag: false,
      screenTitle: '',
      screenOkText: '',
      screenSideBtnText: '',
      detailContent: null,
      filterTagList: [],
      myReview: false,
    };
  },
  head () {
    return {
      title: 'KHUVID REVIEW',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'KHUVID-19는 코로나 19 백신 접종 후기 플랫폼입니다. Review 페이지는 백신 후기를 작성하는 페이지로 다른 사람들의 후기도 볼 수 있습니다.',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getPageParams: 'Review/getPage/getPageParams',
      getPageContents: 'Review/getPage/getPageContents',
      getVaccineName: 'Review/vaccineList/getVaccineName',
      getSideEffectName: 'Review/sideEffectsList/getSideEffectsName',
      getGenderName: 'User/getGenderType/getCodeName',
      getAgeName: 'User/getAgeType/getCodeName',
    }),
  },
  created () {
    this.clearPageParams();
    this.fetchPageContents({})
      .then(() => {
        this.listContent = this.getPageContents;
      });
  },
  methods: {
    ...mapActions({
      clearPageParams: 'Review/getPage/clearPageParams',
      fetchPageContents: 'Review/getPage/fetchPageContents',
      fetchPageContents2: 'Review/getPage/fetchPageContents2',
      remove: 'Review/remove/remove',
    }),
    scrolling ($state) {
      this.currentPage += 1;
      this.fetchPageContents2({
        page: this.currentPage,
        params: this.getPageParams,
      })
        .then((r) => {
          if (r.data.content.length !== 0) {
            this.listContent.push(...this.getPageContents);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
    clickSearch () {
      this.listContent = [];
      this.currentPage = 0;
      this.loadPage();
    },
    async loadPage () {
      await this.fetchPageContents2({
        page: this.currentPage,
        params: this.getPageParams,
      }); // 무한 스크롤 구현하기
      this.listContent = this.getPageContents;
    },
    clickOk () {
      if (this.okText === '삭제') {
        this.remove(this.detailContent.id)
          .then(() => {
            this.screenFlag = false;
            this.listContent = [];
            this.currentPage = 0;
            this.loadPage();
          });
      } else if (this.okText === '로그인') {
        this.$auth.loginWith('google', { params: { prompt: 'select_account' } });
      } else {
        this.screenFlag = false;
      }
    },
    clickCancel () {
      this.modalFlag = false;
    },
    onClickMenu (type) {
      if (type === '수정') {
        this.moveToScreen('modify');
      } else if (type === '삭제') {
        this.clickRemove();
      }
    },
    closeModal () {
      this.modalFlag = false;
    },
    clickDetail (item) {
      this.detailContent = item;
      this.moveToScreen('detail');
    },
    onClickSideBtn () {
      this.$refs.filterCont.clearData();
    },
    moveToScreen (type) {
      this.screenType = type;
      switch (type) {
        case 'add':
          this.myReview = false;
          if (this.$store.getters.getUser === null) {
            this.modalText = '로그인 후 작성해주세요.';
            this.okText = '로그인';
            this.cancelText = '닫기';
            this.modalFlag = true;
            return;
          }
          this.screenTitle = '접종후기';
          this.screenOkText = '완료';
          this.screenSideBtnText = '';
          break;
        case 'modify':
          this.myReview = false;
          this.screenTitle = '접종후기';
          this.screenOkText = '완료';
          this.screenSideBtnText = '';
          break;
        case 'detail':
          if (this.$store.getters.getUser === null) {
            this.myReview = false;
          } else {
            this.myReview = this.$store.getters.getUser.id === this.detailContent.authorId;
          }
          this.screenTitle = '접종후기';
          this.screenOkText = null;
          this.screenSideBtnText = '';
          break;
        case 'filter':
          this.myReview = false;
          this.screenTitle = '필터설정';
          this.screenOkText = '완료';
          this.screenSideBtnText = '초기화';
          break;
      }
      this.screenFlag = true;
    },
    onClickBack () {
      this.screenFlag = false;
      if (this.screenType === 'add') {
        this.$refs.addCont.clearData();
      } else if (this.screenType === 'modify') {
        this.moveToScreen('detail');
      }
    },
    onClickOk () {
      if (this.screenType === 'add') {
        this.$refs.addCont.clickAdd();
      } else if (this.screenType === 'modify') {
        this.$refs.modifyCont.clickModify();
      } else if (this.screenType === 'filter') {
        this.$refs.filterCont.clickSearch();
        this.screenFlag = false;
        this.filterTagList = [];
        if (this.getPageParams.authorAges) {
          this.filterTagList.push(...this.getPageParams.authorAges.map((r) => {
            return this.getAgeName(r);
          }));
        }
        if (this.getPageParams.sideEffects) {
          this.filterTagList.push(...this.getPageParams.sideEffects.map((r) => {
            return this.getSideEffectName(r);
          }));
        }
        if (this.getPageParams.vaccines) {
          this.filterTagList.push(...this.getPageParams.vaccines.map((r) => {
            return this.getVaccineName(r);
          }));
        }
        if (this.getPageParams.authorGenders) {
          this.filterTagList.push(...this.getPageParams.authorGenders.map((r) => {
            return this.getGenderName(r);
          }));
        }
        if (this.getPageParams.endInoculated) {
          this.filterTagList.push(`${this.getPageParams.startInoculated.slice(0, 10)}~${this.getPageParams.endInoculated.slice(0, 10)}`);
        }
        this.listContent = [];
        this.currentPage = 0;
        this.loadPage();
      }
    },
    afterAdd () {
      this.screenFlag = false;
      this.listContent = [];
      this.currentPage = 0;
      this.loadPage();
    },
    afterModify (detail) {
      this.screenFlag = false;
      this.detailContent = detail;
      this.moveToScreen('detail');
      this.listContent = [];
      this.currentPage = 0;
      this.loadPage();
    },
    clickRemove () {
      this.modalText = '후기를 삭제하시겠습니까?';
      this.okText = '삭제';
      this.cancelText = '취소';
      this.modalFlag = true;
    },
  },
};
</script>
