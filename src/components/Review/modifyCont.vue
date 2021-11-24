<template>
  <div>
    <div>
      <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
        <div class="text-lg mb-1 ml-1">백신 종류</div>
        <div>
          <div v-for="(value, key) in getVaccine" :key="key" class="m-1 btn btn-outline btn-primary btn-sm"
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
      <div class=" border rounded-box px-3 py-4 mx-4 my-2 bg-white">
        <div class="text-lg mb-1 ml-1">접종 날짜</div>
        <div>
          <v-date-picker v-model="inoculatedDate" :masks="masks" class="inline-block h-full"
          >
            <template #default="{ inputValue, togglePopover }">
              <div class="flex items-center">
                <input
                  :value="inputValue"
                  class="text-center bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-xl focus:outline-none focus:border-blue-500"
                  readonly
                  @click="togglePopover()"
                />
              </div>
            </template>
          </v-date-picker>
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
          <div  v-if="haveDisease==='true'" class="h-px bg-gray-200 m-1"></div>
          <input
            v-if="haveDisease==='true'"
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
      </div>
      <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
        <div class="text-lg mb-1 ml-1">이상반응</div>
        <div>
          <div v-for="(value, key) in getSideEffects" :key="key" class="m-1 btn btn-outline btn-primary btn-sm"
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
          </div>
          <div v-if="sideEffects.includes('OTHER')" class="h-px bg-gray-200 m-1"></div>
          <input
            v-if="sideEffects.includes('OTHER')"
            v-model="sideEffectsDisc"
            placeholder="이상반응을 입력해주세요."
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
      </div>
      <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="form-control">
          <textarea
            v-model="detailDisc"
            placeholder="내용을 입력해주세요."
            class="
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
      </div>
    </div>
    <confirm-modal :check-flag="modalFlag"
                   :text="modalText"
                   ok-text="확인"
                   @closeModal="closeModal"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ConfirmModal from "@/components/Review/confirmModal";

export default {
  components: {
    ConfirmModal,
  },
  props: {
    detailContent: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      modalFlag: false,
      modalText:'',

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
      sideEffectsDisc:null,

    }
  },
  watch:{
    detailContent:{
      immediate:true,
      deep:true,
      handler(v){
        if(v != null) {
          const temp = JSON.parse(JSON.stringify(v))
          this.sideEffects= temp.sideEffects;
          this.vaccine= temp.vaccine;
          this.haveDisease= String(temp.haveDisease);
          this.detailDisc= temp.detailDisc;
          this.diseaseDisc= temp.diseaseDisc;
          this.inoculatedDate= temp.inoculatedDate;
        }
      },
    },
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
      modify: 'Review/modify/modify',
    }),
    closeModal() {
      this.modalFlag = false;
    },
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
    clickModify() {
      const params = {
        ...this.detailContent,
        id: this.detailContent.id,
        detailDisc: this.detailDisc,
        diseaseDisc: this.diseaseDisc,
        haveDisease: this.haveDisease==='true',
        inoculatedDate: (typeof this.inoculatedDate)==='string'?this.inoculatedDate.slice(0,10):this.inoculatedDate.toISOString().slice(0,10),
        sideEffects: this.sideEffects,
        vaccine: this.vaccine,
      };
      if(this.sideEffectsDisc)params.sideEffects.push(this.sideEffectsDisc);
      if(this.haveDisease==='false') params.diseaseDisc = '';
      if (this.haveDisease === 'true' && this.diseaseDisc === '') {
        this.modalText = '기저질환을 입력해주세요.';
        this.modalFlag = true;
      } else {
        this.modify(params)
          .then(() => {
            this.clearData();
            this.$emit('afterModify', params);
          })
      }
    },
  },
}
</script>

<style>
</style>
