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
      :menu-list="['수정','삭제']"
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

    <button
      class="absolute bottom-0 right-5 bg-primary w-16 h-16 rounded-full"
      @click="moveToScreen('add')">
      <fa-icon class="text-white text-xl" icon="pen"/>
    </button>
    <confirm-modal :check-flag="modalFlag"
                   text="후기를 삭제하시겠습니까?"
                   ok-text="삭제"
                   cancel-text="취소"
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
  },
  data() {
    return {
      modalFlag: false,
      screenType: null,
      screenFlag: false,
      screenTitle: '',
      screenOkText: '',
      screenSideBtnText: '',
      detailContent: null,
      filterTagList:[],
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
    clickOk(){
      this.screenFlag = false;
      this.remove({id:this.detailContent.id})
        .then(()=>{
          this.screenFlag = false;
        })

    },
    clickCancel(){
      this.modalFlag=false;
    },
    onClickMenu(type){
      if(type==='수정'){
        this.moveToScreen('modify')
      }else if(type==='삭제'){
        this.clickRemove();
      }
    },
    closeModal(){
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
          ...this.getPageParams.filters.authorAge.map((r) => {return this.getAgeName(r);}),
          ...this.getPageParams.filters.sideEffects.map((r) => {return this.getSideEffectName(r);}),
          ...this.getPageParams.filters.vaccine.map((r) => {return this.getVaccineName(r);}),
          this.getGenderName(this.getPageParams.filters.authorGender),
          `${this.getPageParams.filters.endInoculated.slice(0,10)}~${this.getPageParams.filters.startInoculated.slice(0,10)}`,
        ];
      }
    },
    afterAdd(){
      this.screenFlag = false;
      // 목록 리로드
    },
    afterModify(detail){
      this.screenFlag = false;
      this.detailContent = detail;
      this.moveToScreen('detail');
    },
    clickRemove(){
      this.modalFlag = true;

    },
  },
}
</script>
