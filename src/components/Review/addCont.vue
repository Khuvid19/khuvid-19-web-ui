<template>
  <div>
    <div>
      <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
        <div class="text-lg mb-1 ml-1">
          백신 종류
        </div>
        <div>
          <div
            v-for="(value, key) in getVaccine"
            :key="key"
            class="m-1 btn btn-outline btn-primary btn-sm btn-review"
            :style="{
              backgroundColor:vaccine===value.code ?
                darkFlag ? '#417d87 !important' : '#65C3C8 !important' : 'white',
              color:vaccine===value.code ? 'white !important' :
                darkFlag ? '#417d87' : '#65C3C8'
            }"
            @click="clickVaccine(value.code)"
          >
            <label>{{ value.value }}</label>
            <input
              type="checkbox"
              class="toggle"
              style="display: none"
              :checked="vaccine===value.code"
            >
          </div>
        </div>
      </div>
      <div class="border rounded-box px-3 py-4 mx-4 my-2 bg-white bg-dark">
        <div class="text-lg mb-1 ml-1">
          접종 날짜
        </div>
        <div>
          <v-date-picker
            v-if="!darkFlag"
            v-model="inoculatedDate"
            :masks="masks"
            class="inline-block h-full"
          >
            <template #default="{ inputValue, togglePopover }">
              <div class="flex items-center">
                <input
                  :value="inputValue"
                  class="text-center bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-xl focus:outline-none focus:border-blue-500 bg-dark-200"
                  readonly
                  @click="togglePopover()"
                >
              </div>
            </template>
          </v-date-picker>
          <v-date-picker
            v-if="darkFlag"
            v-model="inoculatedDate"
            :masks="masks"
            class="inline-block h-full"
            is-dark
          >
            <template #default="{ inputValue, togglePopover }">
              <div class="flex items-center">
                <input
                  :value="inputValue"
                  class="text-center bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-xl focus:outline-none focus:border-blue-500 bg-dark-200"
                  readonly
                  @click="togglePopover()"
                >
              </div>
            </template>
          </v-date-picker>
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
            class="m-1 btn btn-outline btn-primary btn-sm btn-review"
            :style="{
              backgroundColor:haveDisease===key ?
                darkFlag ? '#417d87 !important' : '#65C3C8 !important' : 'white',
              color:haveDisease===key ? 'white !important' :
                darkFlag ? '#417d87' : '#65C3C8'
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
          <div v-if="haveDisease==='true'" class="h-px bg-gray-200 m-1" />
          <input
            v-if="haveDisease==='true'"
            v-model="diseaseDisc"
            placeholder="기저질환을 입력해 주세요."
            class="
              rounded-lg
              border-2
              focus:border-primary
              outline-none
              p-1
              pl-2
              w-full
              my-2
              bg-dark-200
            "
          >
        </div>
      </div>
      <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
        <div class="text-lg mb-1 ml-1">
          이상반응
        </div>
        <div>
          <div
            v-for="(value, key) in getSideEffects"
            :key="key"
            class="m-1 btn btn-outline btn-primary btn-sm btn-review"
            :style="{
              backgroundColor:sideEffects.includes(value.code) ?
                darkFlag ? '#417d87 !important' : '#65C3C8 !important' : 'white',
              color:sideEffects.includes(value.code) ? 'white !important' :
                darkFlag ? '#417d87' : '#65C3C8'
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
          <div v-if="sideEffects.includes('OTHER')" class="h-px bg-gray-200 m-1" />
          <input
            v-if="sideEffects.includes('OTHER')"
            v-model="etcSideEffect"
            placeholder="이상반응을 입력해 주세요."
            class="
              rounded-lg
              border-2
              focus:border-primary
              outline-none
              p-1
              pl-2
              w-full
              my-2
              bg-dark-200
            "
          >
        </div>
      </div>
      <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
        <div class="form-control">
          <textarea
            v-model="detailDisc"
            placeholder="내용을 입력해 주세요."
            style="min-height: 200px"
            class="
              focus:border-primary
              outline-none
              w-full
              rounded-lg
              h-auto
              write-textarea
              resize-none
              bg-dark
            "
          />
        </div>
      </div>
    </div>
    <confirm-modal
      :check-flag="modalFlag"
      :text="modalText"
      ok-text="확인"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ConfirmModal from '@/components/Review/confirmModal';

export default {
  components: {
    ConfirmModal,
  },
  data () {
    return {
      modalFlag: false,
      modalText: '',
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
      etcSideEffect: null,
      btnColor: '',
      darkFlag: document.documentElement.classList.contains('dark'),
    };
  },
  computed: {
    ...mapGetters({
      getSideEffects: 'Review/sideEffectsList/getListContents',
      getVaccine: 'Review/vaccineList/getListContents',
    }),
  },
  methods: {
    ...mapActions({
      add: 'Review/add/add',
    }),
    closeModal () {
      this.modalFlag = false;
    },
    clearData () {
      this.sideEffects = [];
      this.vaccine = '';
      this.haveDisease = 'false';
      this.detailDisc = '';
      this.diseaseDisc = '';
      this.inoculatedDate = new Date();
    },
    clickSideEffects (key) {
      if (this.sideEffects.includes(key)) {
        const idx = this.sideEffects.findIndex(r => r === key);
        this.sideEffects.splice(idx, 1);
      } else {
        this.sideEffects.push(key);
      }
    },
    clickVaccine (key) {
      this.vaccine = key;
    },
    clickHaveDisease (key) {
      this.haveDisease = key;
    },
    clickAdd () {
      const params = {
        detailDisc: this.detailDisc,
        diseaseDisc: this.diseaseDisc,
        haveDisease: this.haveDisease === 'true',
        inoculatedDate: this.inoculatedDate.toISOString().slice(0, 10),
        sideEffects: this.sideEffects,
        etcSideEffect: this.etcSideEffect,
        vaccine: this.vaccine,
      };
      if (this.haveDisease === 'false') { params.diseaseDisc = ''; }
      if (this.vaccine === '') {
        this.modalText = '백신종류는 필수 입력 항목입니다.';
        this.modalFlag = true;
      } else if (this.haveDisease === 'true' && this.diseaseDisc === '') {
        this.modalText = '기저질환을 입력해 주세요.';
        this.modalFlag = true;
      } else {
        this.add(params)
          .then(() => {
            this.clearData();
            this.$emit('afterAdd');
          }).catch((e) => {
            if (e.response.status === 410) {
              this.modalText = '이미 등록된 백신 후기가 존재합니다.';
              this.modalFlag = true;
            }
          });
      }
    },
  },
};
</script>

<style>
</style>
