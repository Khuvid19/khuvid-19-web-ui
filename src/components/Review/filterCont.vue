<template>
  <div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">백신 종류</div>
      <div>
        <div v-for="(value, key) in getVaccine" :key="key" class="m-1 btn btn-outline btn-primary btn-sm"
             :style="{
           backgroundColor:vaccine.includes(value.code)?'#65C3C8 !important':'white !important',
           color:vaccine.includes(value.code)?'white !important':'#65C3C8 !important'
         }"
             @click="clickVaccine(value.code)"
        >
          <label>{{ value.value }}</label>
          <input type="checkbox" class="toggle"
                 style="display: none"
                 :checked="vaccine.includes(value.code)"
          >
        </div>
      </div>
    </div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">성별</div>
      <div>
        <div v-for="(value, idx) in getGender" :key="idx" class="m-1 btn btn-outline btn-primary btn-sm"
             :style="{
           backgroundColor:authorGender.includes(value.code)?'#65C3C8 !important':'white !important',
           color:authorGender.includes(value.code)?'white !important':'#65C3C8 !important'
         }"
             @click="clickGender(value.code)"
        >
          <label>{{ value.value }}</label>
          <input type="checkbox" class="toggle"
                 style="display: none"
                 :checked="authorGender.includes(value.code)"
          >
        </div>
      </div>
    </div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">나이</div>
      <div>
        <div v-for="(value, idx) in getAge" :key="idx" class="m-1 btn btn-outline btn-primary btn-sm"
             :style="{
           backgroundColor:authorAge.includes(value.code)?'#65C3C8 !important':'white !important',
           color:authorAge.includes(value.code)?'white !important':'#65C3C8 !important'
         }"
             @click="clickAge(value.code)"
        >
          <label>{{ value.value }}</label>
          <input type="checkbox" class="toggle"
                 style="display: none"
                 :checked="authorAge.includes(value.code)"
          >
        </div>
      </div>
    </div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">기저질환</div>
      <div>
        <div v-for="(value, key) in YNList" :key="key" class="m-1 btn btn-outline btn-primary btn-sm"
             :style="{
           backgroundColor:haveDisease===key?'#65C3C8 !important':'white !important',
           color:haveDisease===key?'white !important':'#65C3C8 !important'
         }"
             @click="clickHaveDisease(key)"
        >
          <label>{{ value }}</label>
          <input type="checkbox" class="toggle"
                 style="display: none"
                 :checked="haveDisease===key"
          >
        </div>
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
        <div v-for="(value) in getSideEffects" :key="value.code" class="m-1 btn btn-outline btn-primary btn-sm"
             :style="{
           backgroundColor:sideEffects.includes(value.code)?'#65C3C8 !important':'white !important',
           color:sideEffects.includes(value.code)?'white !important':'#65C3C8 !important'
         }"
             @click="clickSideEffects(value.code)"
        >
          <label>{{ value.value }}</label>
          <input type="checkbox" class="toggle"
                 style="display: none"
                 :checked="sideEffects.includes(value.code)"
          >
        </div>
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
        start: new Date(),
        end: new Date(),
      },
      date: new Date(),
      masks: {
        input: 'YYYY-MM-DD',
      },
      YNList: {
        true: '있음',
        false: '없음',
      },
      authorAge: [],
      authorGender: [],
      sideEffects: [],
      vaccine: [],
      haveDisease: '',
      detailDisc: '',
    }
  },
  computed: {
    ...mapGetters({
      getReviewParams: 'Review/getPage/getPageParams',
      getSideEffects: 'Review/sideEffectsList/getListContents',
      getVaccine: 'Review/vaccineList/getListContents',
      getAge: 'User/getAgeType/getListContents',
      getGender: 'User/getGenderType/getListContents',
    }),
  },
  created() {
    this.fetchSideEffects();
    this.fetchVaccine();
    this.fetchAge();
    this.fetchGender();
  },

  methods: {
    ...mapActions({
      fetchReview: 'Review/getPage/fetchPageContents',
      setReviewParams: 'Review/getPage/setPageParams',
      fetchSideEffects: 'Review/sideEffectsList/fetchListContents',
      fetchVaccine: 'Review/vaccineList/fetchListContents',
      fetchAge: 'User/getAgeType/fetchListContents',
      fetchGender: 'User/getGenderType/fetchListContents',
      add: 'Review/add/add',
    }),
    clearData(){
      this.authorAge= [];
      this.authorGender= [];
      this.sideEffects= [];
      this.vaccine= [];
      this.haveDisease= [];
      this.detailDisc= '';
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
    clickAge(key) {
      if (this.authorAge.includes(key)) {
        const idx = this.authorAge.findIndex((r) => r === key);
        this.authorAge.splice(idx, 1);
      } else {
        this.authorAge.push(key);
      }
    },
    clickGender(key) {
      if (this.authorGender.includes(key)) {
        const idx = this.authorGender.findIndex((r) => r === key);
        this.authorGender.splice(idx, 1);
      } else {
        this.authorGender.push(key);
      }
    },
    clickVaccine(key) {
      if (this.vaccine.includes(key)) {
        const idx = this.vaccine.findIndex((r) => r === key);
        this.vaccine.splice(idx, 1);
      } else {
        this.vaccine.push(key);
      }
    },
    clickHaveDisease(key) {
      this.haveDisease = key;
    },
    clickSearch() {
      const params = {
        authorAges: this.authorAge,
        authorGenders: this.authorGender,
        detailDisc: this.detailDisc,
        endInoculated: this.range.end.toISOString().slice(0,10),
        haveDisease: this.haveDisease,
        startInoculated: this.range.start.toISOString().slice(0,10),
        sideEffects: this.sideEffects,
        vaccines: this.vaccine,
      };
      this.setReviewParams(params);
      this.fetchReview(params);
      this.clearData();
    },
  },
}
</script>

<style>
</style>
