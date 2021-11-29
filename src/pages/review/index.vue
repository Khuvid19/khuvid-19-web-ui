<template>
  <div>
    <search-filter ref="searchFilter"
                   :filter-tag-list="filterTagList"
                   @clickFilter="moveToScreen('filter')"/>
    <div class="h-px bg-gray-200"></div>
    <list-item @clickDetail="clickDetail"/>

    <full-screen
      v-model="screenFlag"
      :title="screenTitle"
      :ok-text="screenOkText"
      :side-btn-text="screenSideBtnText"
      :menu-list="myReview?['수정','삭제']:[]"
      @onClickMenu="onClickMenu"
      @onClickBack="onClickBack"
      @onClickOk="onClickOk"
    >
      <filter-cont v-if="screenType === 'filter'" ref="filterCont"/>
      <detail-cont v-if="screenType === 'detail'"
                   :detail-content="detailContent"
      />
      <add-cont v-if="screenType === 'add'" ref="addCont"
                @afterAdd="afterAdd"
      />
      <modify-cont v-if="screenType === 'modify'"
                   ref="modifyCont"
                   :detail-content="detailContent"
                   @afterModify="afterModify"/>
    </full-screen>
    <write-btn content="글쓰기" @clickWriteBtn="moveToScreen('add')"/>

    <confirm-modal :check-flag="modalFlag"
                   :text="modalText"
                   :ok-text="okText"
                   :cancel-text="cancelText"
                   @clickOk="clickOk"
                   @clickCancel="clickCancel"
                   @closeModal="closeModal"/>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SearchFilter from '@/components/Review/SearchFilter/index';
import ListItem from '@/components/Review/listItem'
import DetailCont from '@/components/Review/detailCont'
import AddCont from '@/components/Review/addCont'
import ModifyCont from '@/components/Review/modifyCont'
import FilterCont from '@/components/Review/filterCont'
import FullScreen from '@/components/_Common/fullScreen'
import ConfirmModal from "@/components/Review/confirmModal";
import WriteBtn from '@/components/_Common/writeBtn'

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
  data() {
    return {
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
    }
  },
  computed: {
    ...mapGetters({
      getPageParams: 'Review/getPage/getPageParams',
      getVaccineName: 'Review/vaccineList/getVaccineName',
      getSideEffectName: 'Review/sideEffectsList/getSideEffectsName',
      getGenderName: 'User/getGenderType/getCodeName',
      getAgeName: 'User/getAgeType/getCodeName',
    }),
  },
  created() {
    this.fetchPageContents({});
  },
  methods: {
    ...mapActions({
      fetchPageContents: 'Review/getPage/fetchPageContents',
      remove: 'Review/remove/remove',
    }),
    clickOk() {
      if (this.okText === '삭제') {
        this.remove(this.detailContent.id)
          .then(() => {
            this.screenFlag = false;
            this.fetchPageContents({});
          })
      } else if (this.okText === '로그인') {
        this.$auth.loginWith('google', { params: { prompt: 'select_account' } })
      } else {
        this.screenFlag = false;
      }
    },
    clickCancel() {
      this.modalFlag = false;
    },
    onClickMenu(type) {
      if (type === '수정') {
        this.moveToScreen('modify')
      } else if (type === '삭제') {
        this.clickRemove();
      }
    },
    closeModal() {
      this.modalFlag = false;
    },
    clickDetail(item) {
      this.detailContent = item;
      this.moveToScreen('detail');
    },
    moveToScreen(type) {
      this.screenType = type
      switch (type) {
        case 'add':
          if (this.$store.getters.getUser === null) {
            this.modalText = '로그인 후 작성해주세요.'
            this.okText = '로그인';
            this.cancelText = '닫기';
            this.modalFlag = true;
            return;
          }
          this.screenTitle = '접종후기'
          this.screenOkText = '완료'
          this.screenSideBtnText = ''
          break
        case 'modify':
          this.screenTitle = '접종후기'
          this.screenOkText = '완료'
          this.screenSideBtnText = ''
          break
        case 'detail':
          if(this.$store.getters.getUser === null){
            this.myReview = false;
          }else{
            this.myReview = this.$store.getters.getUser.id === this.detailContent.authorId;

          }
          this.screenTitle = '접종후기'
          this.screenOkText = null
          this.screenSideBtnText = ''
          break
        case 'filter':
          this.screenTitle = '필터설정'
          this.screenOkText = '완료'
          break
      }
      this.screenFlag = true
    },
    onClickBack() {
      this.screenFlag = false;
      if (this.screenType === 'add') {
        this.$refs.addCont.clearData();
      } else if (this.screenType === 'modify') {
        this.moveToScreen('detail');
      }
    },
    onClickOk() {
      if (this.screenType === 'add') {
        this.$refs.addCont.clickAdd();
      } else if (this.screenType === 'modify') {
        this.$refs.modifyCont.clickModify();
      } else if (this.screenType === 'filter') {
        this.$refs.filterCont.clickSearch();
        this.screenFlag = false;
        this.filterTagList = [
          ...this.getPageParams.authorAges.map((r) => {
            return this.getAgeName(r);
          }),
          ...this.getPageParams.sideEffects.map((r) => {
            return this.getSideEffectName(r);
          }),
          ...this.getPageParams.vaccines.map((r) => {
            return this.getVaccineName(r);
          }),
          ...this.getPageParams.authorGenders.map((r) => {
            return this.getGenderName(r);
          }),
          `${this.getPageParams.endInoculated.slice(0, 10)}~${this.getPageParams.startInoculated.slice(0, 10)}`,
        ];
      }
    },
    afterAdd() {
      this.screenFlag = false;
      this.fetchPageContents({})
    },
    afterModify(detail) {
      this.screenFlag = false;
      this.detailContent = detail;
      this.moveToScreen('detail');
      this.fetchPageContents({});
    },
    clickRemove() {
      this.modalText = '후기를 삭제하시겠습니까?';
      this.okText = '삭제';
      this.cancelText = '취소';
      this.modalFlag = true;

    },
  },
}
</script>
