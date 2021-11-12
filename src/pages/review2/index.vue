<template>
  <div>
    <search-filter @clickFilter="moveToScreen('filter')"/>
    <div class="w-full my-2 h-px bg-gray-200"></div>
    <div class="review-list overflow-y-scroll">
      <list-cont @click="moveToScreen('detail')"/>
      <list-cont @click="moveToScreen('detail')"/>
      <list-cont @click="moveToScreen('detail')"/>
      <list-cont @click="moveToScreen('detail')"/>
      <list-cont @click="moveToScreen('detail')"/>
      <list-cont @click="moveToScreen('detail')"/>
      <list-cont @click="moveToScreen('detail')"/>
    </div>
    <button
      v-if="!btnFlag"
      class="absolute bottom-5 right-5 bg-primary w-16 h-16 rounded-full"
      @click="btnFlag=true"
    >
      <fa-icon class="text-white text-xl" icon="pen"/>
    </button>
    <div
      v-else
      class="absolute bottom-5 right-5 w-full h-16"
    >
      <div class="flex justify-end items-center gap-4">
        <button class="text-white text-xl bg-primary w-40 h-16 rounded-xl"
                @click="openSimple">
          간편후기
        </button>
        <button class="text-white text-xl bg-primary w-40 h-16 rounded-xl"
                @click="moveToScreen('addDetail')">
          상세후기
        </button>
        <button class="bg-primary w-16 h-16 rounded-full"
                @click="btnFlag=false">
          <fa-icon class="text-white text-xl" icon="times"/>
        </button>
      </div>
    </div>
    <FullScreen
      v-model="screenFlag"
      :title="screenTitle"
      :ok-text="screenOkText"
      @onClickBack="screenFlag = false"
    >
      <filter-cont v-if="screenType === 'filter'"/>
      <add-detail-cont v-if="screenType === 'addDetail'"/>
      <detail-cont v-if="screenType === 'detail'"/>
    </FullScreen>
    <add-simple-cont :check-flag="simpleFlag" @closeModal="closeModal"/>
  </div>
</template>

<script>
import SearchFilter from '@/components/Review2/searchFilter'
import ListCont from '@/components/Review2/listCont'
import AddDetailCont from '@/components/Review2/addDetailCont'
import AddSimpleCont from '@/components/Review2/addSimpleCont'
import DetailCont from '@/components/Review2/detailCont'
import FilterCont from '@/components/Review2/filterCont'
import FullScreen from '@/components/_Common/fullScreen'

export default {
  components: {AddSimpleCont, DetailCont, AddDetailCont, FilterCont, FullScreen, SearchFilter, ListCont},
  data() {
    return {
      screenType: null,
      screenFlag: false,
      screenTitle: '',
      screenOkText: '',
      btnFlag: false,
      simpleFlag: false,
    }
  },
  watch:{
    screenFlag(v){
      if(!v){
        this.btnFlag = false;
      }
    },
  },
  methods: {
    closeModal(){
      this.simpleFlag = false;
      this.btnFlag = false;
    },
    openSimple() {
      this.simpleFlag = true;
    },
    moveToScreen(type) {
      this.screenType = type
      switch (type) {
        case 'addDetail':
          this.screenTitle = '접종후기'
          this.screenOkText = '완료'
          break
        case 'detail':
          this.screenTitle = '접종후기'
          this.screenOkText = null
          break
        case 'filter':
          this.screenTitle = '필터설정'
          this.screenOkText = '완료'
          break
      }
      this.screenFlag = true
    },
  },
}
</script>
