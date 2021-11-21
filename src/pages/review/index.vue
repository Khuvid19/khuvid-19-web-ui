<template>
  <div>
    <search-filter @clickFilter="moveToScreen('filter')"/>
    <div class="h-px bg-gray-200"></div>
    <list-item @clickDetail="clickDetail"/>

    <full-screen
      v-model="screenFlag"
      :title="screenTitle"
      :ok-text="screenOkText"
      :side-btn-text="screenSideBtnText"
      @onClickBack="onClickBack"
      @onClickOk="onClickOk"
    >
      <filter-cont v-if="screenType === 'filter'"/>
      <detail-cont v-if="screenType === 'detail'"
                   :detail-content="detailContent"
                   @clickModify="moveToScreen('modify')"
                   @clickRemove="clickRemove"
      />
      <add-cont v-if="screenType === 'add'" ref="addCont"/>
      <modify-cont v-if="screenType === 'modify'"
                   ref="modifyCont"
                   :detail-content="detailContent"/>
    </full-screen>

    <button
      class="absolute bottom-5 right-5 bg-primary w-16 h-16 rounded-full"
      @click="moveToScreen('add')">
      <fa-icon class="text-white text-xl" icon="pen"/>
    </button>

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

export default {
  name: 'Review',
  components: {
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
      screenType: null,
      screenFlag: false,
      screenTitle: '',
      screenOkText: '',
      screenSideBtnText: '',
      detailContent: null,
    }
  },
  computed: {
    ...mapGetters({
      getPageParams: 'Review/getPage/getPageParams',
    }),
  },
  created() {
    // this.fetchPageContents(this.getPageParams);
  },
  methods: {
    ...mapActions({
      fetchPageContents: 'Review/getPage/fetchPageContents',
      remove: 'Review/remove/remove',
    }),
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
      this.$refs.addCont.clearData();
    },
    onClickOk() {
      if (this.screenType === 'add') {
        this.$refs.addCont.clickAdd();
      } else if (this.screenType === 'modify') {
        this.$refs.modifyCont.clickModify();
      }
    },
    clickRemove(){
      this.remove({id:this.detailContent.id});
    },
  },
}
</script>
