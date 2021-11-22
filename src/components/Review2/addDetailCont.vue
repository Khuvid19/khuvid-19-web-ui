<template>
  <div class="p-3">
    <div class="border-2 border-gray-300 p-2 rounded-lg  m-1 mb-2">
      <div class="text-lg ml-1">백신종류</div>
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
    <div class="border-2 border-gray-300 p-2 rounded-lg  m-1 mb-2">
      <div class="text-lg ml-1">접종날짜</div>
      <div>
        <v-date-picker v-model="inoculatedDate" class="inline-block h-full"
                       masks="YYYY-MM-DD"
        >
          <template #default="{ inputValue, togglePopover }">
            <div class="flex items-center">
              <input
                :value="inputValue"
                class="text-center bg-white text-gray-700 py-1
                px-2 appearance-none border rounded-xl
                 focus:outline-none focus:border-blue-500"
                readonly
                @click="togglePopover()"
              />
            </div>
          </template>
        </v-date-picker>
      </div>
    </div>
    <div class="border-2 border-gray-300 p-2 rounded-lg  m-1 mb-2 ">
      <div class="text-lg ml-1">기저질환</div>
      <div v-for="(value, key) in YNList" :key="key" class="m-1 btn btn-outline btn-primary btn-sm"
           :class="haveDisease===key?'bg-red-500':'bg-white'"
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
      <div class="h-px bg-gray-200 m-1"></div>
      <input
        v-model="diseaseDisc"
        placeholder="기저질환을 입력해주세요."
        class="
        rounded-lg
        border-2
        focus:border-primary
        outline-none
        p-1
        pl-2
        w-full
        my-2
      "
      />
    </div>
    <div class="border-2 border-gray-300 p-2 rounded-lg  m-1 mb-2">
      <div class="text-lg ml-1">이상반응</div>
      <div v-for="(value, key) in getSideEffects" :key="key" class="m-1 btn btn-outline btn-primary btn-sm"
           :class="sideEffects.includes(key)?'bg-red-500':'bg-white'"
           :style="{
           backgroundColor:sideEffects.includes(key)?'#65C3C8 !important':'white !important',
           color:sideEffects.includes(key)?'white !important':'#65C3C8 !important'
         }"
           @click="clickSideEffects(key)"
      >
        <label>{{ value }}</label>
        <input type="checkbox" class="toggle"
               style="display: none"
               :checked="sideEffects.includes(key)"
        >
        <!--      style="display: none"-->
      </div>
    </div>
    <textarea
      v-model="detailDisc"
      placeholder="내용을 입력해주세요."
      class="
        border-2
        border-gray-300
        p-2
        focus:border-primary
        outline-none
        w-full
        rounded-lg
        h-auto
        write-textarea
        resize-none
      "
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "DetailCont",
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      checked: false,
      YNList: {
        true: '있음',
        false: '없음',
      },
      sideEffects: [],
      vaccine: '',
      haveDisease: '',
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
    },
  },
}
</script>

<style scoped>

</style>
