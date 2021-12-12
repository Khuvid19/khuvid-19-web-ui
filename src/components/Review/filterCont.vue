<template>
  <div class="mt-4">
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">
        백신 종류
      </div>
      <div>
        <div
          v-for="(value, key) in getVaccine"
          :key="key"
          class="m-1 btn btn-outline btn-primary btn-sm"
          :style="{
            backgroundColor:vaccines.includes(value.code)?'#65C3C8 !important':'white !important',
            color:vaccines.includes(value.code)?'white !important':'#65C3C8 !important'
          }"
          @click="clickVaccine(value.code)"
        >
          <label>{{ value.value }}</label>
          <input
            type="checkbox"
            class="toggle"
            style="display: none"
            :checked="vaccines.includes(value.code)"
          >
        </div>
      </div>
    </div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">
        성별
      </div>
      <div>
        <div
          v-for="(value, idx) in getGender"
          :key="idx"
          class="m-1 btn btn-outline btn-primary btn-sm"
          :style="{
            backgroundColor:authorGenders.includes(value.code)?'#65C3C8 !important':'white !important',
            color:authorGenders.includes(value.code)?'white !important':'#65C3C8 !important'
          }"
          @click="clickGender(value.code)"
        >
          <label>{{ value.value }}</label>
          <input
            type="checkbox"
            class="toggle"
            style="display: none"
            :checked="authorGenders.includes(value.code)"
          >
        </div>
      </div>
    </div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">
        나이
      </div>
      <div>
        <div
          v-for="(value, idx) in getAge"
          :key="idx"
          class="m-1 btn btn-outline btn-primary btn-sm"
          :style="{
            backgroundColor:authorAges.includes(value.code)?'#65C3C8 !important':'white !important',
            color:authorAges.includes(value.code)?'white !important':'#65C3C8 !important'
          }"
          @click="clickAge(value.code)"
        >
          <label>{{ value.value }}</label>
          <input
            type="checkbox"
            class="toggle"
            style="display: none"
            :checked="authorAges.includes(value.code)"
          >
        </div>
      </div>
    </div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">
        기저질환
      </div>
      <div>
        <div
          v-for="(value, key) in YNList"
          :key="key"
          class="m-1 btn btn-outline btn-primary btn-sm"
          :style="{
            backgroundColor:haveDisease===key?'#65C3C8 !important':'white !important',
            color:haveDisease===key?'white !important':'#65C3C8 !important'
          }"
          @click="clickHaveDisease(key)"
        >
          <label>{{ value }}</label>
          <input
            type="checkbox"
            class="toggle"
            style="display: none"
            :checked="haveDisease===key"
          >
        </div>
      </div>
    </div>
    <div class="border rounded-box px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">
        접종날짜
      </div>
      <div class="w-full">
        <v-date-picker v-model="range" is-range :masks="masks">
          <template #default="{ inputValue, inputEvents }">
            <div class="flex justify-between items-center">
              <input
                :value="inputValue.start"
                class="border px-2 py-1 rounded focus:outline-none focus:border-indigo-300"
                style="width: calc(50% - 20px)"
                v-on="inputEvents.start"
              >
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
                class="border px-2 py-1 rounded focus:outline-none focus:border-indigo-300"
                style="width: calc(50% - 20px)"
                v-on="inputEvents.end"
              >
            </div>
          </template>
        </v-date-picker>
      </div>
    </div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">
        이상반응
      </div>
      <div>
        <div
          v-for="(value) in getSideEffects"
          :key="value.code"
          class="m-1 btn btn-outline btn-primary btn-sm"
          :style="{
            backgroundColor:sideEffects.includes(value.code)?'#65C3C8 !important':'white !important',
            color:sideEffects.includes(value.code)?'white !important':'#65C3C8 !important'
          }"
          @click="clickSideEffects(value.code)"
        >
          <label>{{ value.value }}</label>
          <input
            type="checkbox"
            class="toggle"
            style="display: none"
            :checked="sideEffects.includes(value.code)"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    filterTagList: {
      type: Array,
      default: null,
    },
    screenFlag: {
      type: Boolean,
      default: null,
    },
  },
  data () {
    return {
      range: {
        start: null,
        end: null,
      },
      date: new Date(),
      masks: {
        input: 'YYYY-MM-DD',
      },
      YNList: {
        true: '있음',
        false: '없음',
      },
      authorAges: [],
      authorGenders: [],
      sideEffects: [],
      vaccines: [],
      haveDisease: null,
    };
  },
  watch: {
    screenFlag: {
      immediate: true,
      handler (v) {
        if (v) {
          const temp = JSON.parse(JSON.stringify(this.getReviewParams));
          this.authorAges = temp.authorAges ?? [];
          this.authorGenders = temp.authorGenders ?? [];
          this.sideEffects = temp.sideEffects ?? [];
          this.vaccines = temp.vaccines ?? [];
          this.haveDisease = temp.haveDisease ?? null;
          this.range.start = temp.startInoculated ?? null;
          this.range.end = temp.endInoculated ?? null;
        }
      },
    },
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
  methods: {
    ...mapActions({
      fetchPageContents: 'Review/getPage/fetchPageContents',
      setReviewParams: 'Review/getPage/setPageParams',
      add: 'Review/add/add',
    }),
    setTag () {
      // console.log(this.getReviewParams)
    },
    clearData () {
      this.authorAges = [];
      this.authorGenders = [];
      this.sideEffects = [];
      this.vaccines = [];
      this.haveDisease = null;
      this.range = {
        start: null,
        end: null,
      };
    },
    clickSideEffects (key) {
      if (this.sideEffects.includes(key)) {
        const idx = this.sideEffects.findIndex(r => r === key);
        this.sideEffects.splice(idx, 1);
      } else {
        this.sideEffects.push(key);
      }
    },
    clickAge (key) {
      if (this.authorAges.includes(key)) {
        const idx = this.authorAges.findIndex(r => r === key);
        this.authorAges.splice(idx, 1);
      } else {
        this.authorAges.push(key);
      }
    },
    clickGender (key) {
      if (this.authorGenders.includes(key)) {
        const idx = this.authorGenders.findIndex(r => r === key);
        this.authorGenders.splice(idx, 1);
      } else {
        this.authorGenders.push(key);
      }
    },
    clickVaccine (key) {
      if (this.vaccines.includes(key)) {
        const idx = this.vaccines.findIndex(r => r === key);
        this.vaccines.splice(idx, 1);
      } else {
        this.vaccines.push(key);
      }
    },
    clickHaveDisease (key) {
      this.haveDisease = key;
    },
    clickSearch () {
      const params = {};
      if (this.authorAges.length > 0) { params.authorAges = this.authorAges; }
      if (this.authorGenders.length > 0) { params.authorGenders = this.authorGenders; }
      if (this.getReviewParams.detailDisc) { params.detailDisc = this.getReviewParams.detailDisc; }
      if (this.vaccines.length > 0) { params.vaccines = this.vaccines; }
      if (this.sideEffects.length > 0) { params.sideEffects = this.sideEffects; }
      if (this.haveDisease != null) { params.haveDisease = this.haveDisease; }
      if (typeof this.range.end === 'string') { params.endInoculated = this.range.end; } else if (this.range.end != null) { params.endInoculated = this.range.end.toISOString().slice(0, 10); }
      if (typeof this.range.start === 'string') { params.startInoculated = this.range.start; } else if (this.range.start != null) { params.startInoculated = this.range.start.toISOString().slice(0, 10); }
      this.setReviewParams(params);
      this.clearData();
    },
  },
};
</script>

<style>
</style>
