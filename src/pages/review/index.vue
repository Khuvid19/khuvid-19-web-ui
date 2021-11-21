<template>
  <div>
    <search-filter/>
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
      <detail-cont v-if="screenType === 'detail'" :detail-content="detailContent"/>
      <add-cont v-if="screenType === 'add'" ref="addCont" />
    </full-screen>

    <button
      class="absolute bottom-5 right-5 bg-primary w-16 h-16 rounded-full"
      @click="moveToScreen('add')">
      <fa-icon class="text-white text-xl" icon="pen" />
    </button>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SearchFilter from '@/components/Review/SearchFilter/index';
import ListItem from '@/components/Review/listItem'
import DetailCont from '@/components/Review/detailCont'
import AddCont from '@/components/Review/addCont'
import FullScreen from '@/components/_Common/fullScreen'
export default {
  name: 'Review',
  components: {SearchFilter, ListItem, FullScreen, DetailCont,AddCont},
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
      getPageParams:'Review/getPage/getPageParams',
    }),
  },
  created () {
    this.fetchPageContents(this.getPageParams);
  },
  methods: {
    ...mapActions({
      fetchPageContents:'Review/getPage/fetchPageContents',
      add:'Review/add/add',
    }),
    clickDetail(item){
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
        case 'detail':
          this.screenTitle = '접종후기'
          this.screenOkText = null
          this.screenSideBtnText = ''
          break
      }
      this.screenFlag = true
    },
    onClickBack() {
      this.screenFlag = false;
      this.$refs.addCont.clearData();
    },
    onClickOk(){
      this.$refs.addCont.clickAdd();
    },
  },
}
</script>
