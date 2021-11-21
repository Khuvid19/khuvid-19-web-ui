<template>
  <div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">백신 종류</div>
      <div>
        <div v-for="(value, key) in getVaccine" :key="key" class="m-1 btn btn-outline btn-primary btn-sm"
             :class="vaccine===key?'bg-red-500':'bg-white'"
             :style="{
           backgroundColor:vaccine===key?'#65C3C8 !important':'white !important',
           color:vaccine===key?'white !important':'#65C3C8 !important'
         }"
             @click="clickVaccine(key)"
        >
          <label>{{ value }}</label>
          <input type="checkbox" class="toggle"
                 style="display: none"
                 :checked="vaccine===key"
          >
        </div>
      </div>
    </div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">성별</div>
      <div>
        <button v-for="(item,idx) in gender" :key="idx"
                class=" m-1 btn btn-outline btn-primary btn-sm">
          {{ item }}
        </button>
      </div>
    </div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">나이</div>
      <div>
        <button v-for="(item,idx) in age" :key="idx"
                class="m-1 btn btn-outline btn-primary btn-sm">
          {{ item }}
        </button>
      </div>
    </div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">기저질환</div>
      <div>
        <button v-for="(item,idx) in bb" :key="idx"
                class="m-1 btn btn-outline btn-primary btn-sm">
          {{ item }}
        </button>
      </div>
    </div>
    <div class="border rounded-box px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">처방날짜</div>
      <div>
        <v-date-picker v-model="range" is-range :masks="masks">
          <template #default="{ inputValue, inputEvents }">
            <div class="flex justify-between items-center">
              <input
                :value="inputValue.start"
                class="border px-2 py-1 w-44 rounded focus:outline-none focus:border-indigo-300"
                v-on="inputEvents.start"
              />
              <svg
                class="w-4 h-4 mx-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <input
                :value="inputValue.end"
                class="border px-2 py-1 w-44 rounded focus:outline-none focus:border-indigo-300"
                v-on="inputEvents.end"
              />
            </div>
          </template>
        </v-date-picker>
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
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      range: {
        start: new Date(2020, 9, 12),
        end: new Date(2020, 9, 16),
      },
      vaccineList: ['화이자', '모더나'],
      bb: ['없음', '있음'],
      gender: ['여자', '남자'],
      age: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
      cc: [
        '미열', '고열', '접종부위 통증',
        '구토', '메스꺼움', '두통',
        '관절통', '근육통', '피로감',
        '두드러기', '발진', '가려움증',
        '부기', '기타',
      ],
      date: new Date(),
      masks: {
        input: 'YYYY-MM-DD',
      },
      YNList: {
        true: '있음',
        false: '없음',
      },
      sideEffects: [],
      vaccine: '',
      haveDisease: 'false',
      detailDisc: '',
      diseaseDisc: '',
      inoculatedDate: new Date(),
    }
  },
  computed: {
    ...mapGetters({
      getSideEffects: 'Review/sideEffectsList/getListContents',
      getVaccine: 'Review/vaccineList/getListContents',
    }),
  },
  created() {
    this.fetchSideEffects();
    this.fetchVaccine();
  },

  methods: {
    ...mapActions({
      fetchSideEffects: 'Review/sideEffectsList/fetchListContents',
      fetchVaccine: 'Review/vaccineList/fetchListContents',
      add: 'Review/add/add',
    }),
    clearData(){
      this.sideEffects= [];
      this.vaccine= '';
      this.haveDisease= 'false';
      this.detailDisc= '';
      this.diseaseDisc= '';
      this.inoculatedDate= new Date();
    },
    clickSideEffects(key) {
      if (this.sideEffects.includes(key)) {
        const idx = this.sideEffects.findIndex((r) => r === key);
        this.sideEffects.splice(idx, 1);
      } else {
        this.sideEffects.push(key);
      }
    },
    clickVaccine(key) {
      this.vaccine = key;
    },
    clickHaveDisease(key) {
      this.haveDisease = key;
    },
    clickAdd() {
      const params = {
        detailDisc: this.detailDisc,
        diseaseDisc: this.diseaseDisc,
        haveDisease: this.haveDisease,
        inoculatedDate: this.inoculatedDate,
        sideEffects: this.sideEffects,
        vaccine: this.vaccine,
      };
      console.log(params)
      // this.add(params);
      this.clearData();
    },
  },
}
</script>

<style>
</style>
