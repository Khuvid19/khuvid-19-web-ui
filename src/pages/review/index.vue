<template>
  <div>
    <label for="my-modal-2" class="btn btn-primary modal-button">open modal</label>
    <input id="my-modal-2" type="checkbox" class="modal-toggle">
    <div class="modal items-center">
      <div class="modal-box w-11/12 rounded-box px-0 py-2 h-auto" >
        <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
          <div class="text-lg mb-1 ml-1">백신 종류</div>
          <div>
            <button v-for="(item,idx) in vaccineList" :key="idx"
                    class="m-1 btn btn-outline btn-primary btn-sm">
              {{ item }}
            </button>
          </div>
        </div>
        <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
          <div class="text-lg mb-1 ml-1">접종 날짜</div>
          <div>
            <button v-for="(item,idx) in vaccineList" :key="idx"
                    class="m-1 btn btn-outline btn-primary btn-sm">
              {{ item }}
            </button>
          </div>
        </div>
        <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
          <div class="text-lg mb-1 ml-1">기저질환</div>
          <div>
            <button v-for="(item,idx) in bb" :key="idx"
                    class=" m-1 btn btn-outline btn-primary btn-sm">
              {{ item }}
            </button>
          </div>
          <div class="w-full my-2 h-px bg-gray-200"></div>
          <div class="form-control">
            <input type="text" placeholder="username" class="input input-sm input-bordered">
          </div>
        </div>
        <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
          <div class="text-lg mb-1 ml-1">이상반응</div>
          <div>
            <button v-for="(item,idx) in cc" :key="idx"
                    class="m-1 btn btn-outline btn-primary btn-sm">
              {{ item }}
            </button>
          </div>
        </div>
        <div class="modal-action w-full px-4 my-3">
          <label for="my-modal-2" class="btn btn-primary w-full rounded-xl">작성완료</label>
        </div>
      </div>
    </div>
    <search-filter @clickFilter="moveToScreen('filter')"/>
    <div class="w-full my-2 h-px bg-gray-200"></div>
    <div class="board-list overflow-y-scroll">
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
    <add-simple-cont v-model="simpleFlag"/>
  </div>
</template>

<script>
import SearchFilter from '@/components/Review/searchFilter'
import ListCont from '@/components/Review/listCont'
import AddDetailCont from '@/components/Review/addDetailCont'
import AddSimpleCont from '@/components/Review/addSimpleCont'
import DetailCont from '@/components/Review/detailCont'
import FilterCont from '@/components/Review/filterCont'
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
      vaccineList: ['화이자', '모더나'],
      bb: ['없음', '있음'],
      cc: [
        '미열', '고열', '접종부위 통증',
        '구토', '메스꺼움', '두통',
        '관절통', '근육통', '피로감',
        '두드러기', '발진', '가려움증',
        '부기', '기타',
      ],
    }
  },
  methods: {
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
