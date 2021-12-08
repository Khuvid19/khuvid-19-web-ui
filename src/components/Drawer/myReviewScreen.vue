<template>
  <full-screen
    v-model="screenFlag"
    title="내가 쓴 후기"
    class="bg-gray-100"
    @onClickBack="onClickBack"
  >
    <div class="w-screen my-review-list overflow-y-scroll">
      <div v-for="(item,idx) in getPageContents" v-show="getPageContents.length>0" :key="idx">
        <div class="card shadow m-2 bg-white" @click="clickDetail(item)">
          <div class="card-body p-4">
            <div class="flex justify-between align-middle mb-2">
              <div>
                <div class="flex justify-start items-center">
                  <div class="flex justify-center items-center">
                    <div
                      class="badge badge-xs mr-2"
                      :style="{backgroundColor: getColor(item.vaccine), border: 0}"
                    />
                    <div class="mr-2 text-lg font-semibold">
                      {{ getVaccineName(item.vaccine) }}
                    </div>
                  </div>
                  <div class="flex justify-start items-center bg-gray-100 rounded-lg px-2">
                    <div class="text-2xs">
                      {{ getAgeName(item.authorAge) }}
                    </div>
                    <div class="text-lg" style="margin-left: 3px; margin-right: 3px">
                      ・
                    </div>
                    <div class="text-2xs">
                      {{ getGenderName(item.authorGender) }}
                    </div>
                    <div class="text-lg" style="margin-left: 3px; margin-right: 3px">
                      ・
                    </div>
                    <div class="text-2xs">
                      {{ item.authorNickName }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-2xs flex items-center">
                {{ mm_formatDate(item.createdDate) }}
              </div>
            </div>
            <div>
              <div
                v-if="item.haveDisease"
                class="mr-1 mb-2 btn btn-outline btn-primary btn-sm"
                style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8"
              >
                기저질환
              </div>
              <div
                v-for="(effec,i) in item.sideEffects"
                v-show="i<4"
                :key="i"
                class="mr-2 mb-2 btn btn-outline btn-primary btn-sm"
                style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8"
              >
                {{ getSideEffectsName(effec) }}
              </div>
              <div
                v-if="item.sideEffects.length>4"
                class="mr-1 mb-2 btn btn-outline btn-primary btn-sm"
                style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8"
              >
                ...
              </div>
            </div>
            <p v-show="item.detailDisc" class="text-sm ml-1 mt-1 truncate">
              {{ item.detailDisc }}
            </p>
          </div>
        </div>
      </div>
      <div v-show="getPageContents.length===0" class="w-full h-full flex justify-center items-center">
        <div class="text-gray-500 text-lg">
          작성된 후기가 없습니다.
        </div>
      </div>
    </div>
    <detail-screen
      ref="detailScreen"
      :detail-content="detailContent"
      @afterModify="afterModify"
    />
  </full-screen>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import fullScreen from '../_Common/fullScreen';
import DetailScreen from './myReviewDetail';

export default {
  components: {
    fullScreen,
    DetailScreen,
  },
  data () {
    return {
      screenFlag: false,
      detailContent: {
        authorAge: '',
        authorGender: '',
        authorId: 0,
        createdDate: '',
        detailDisc: '',
        diseaseDisc: '',
        haveDisease: true,
        id: 0,
        inoculatedDate: '',
        sideEffects: [],
        vaccine: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      getPageContents: 'Review/getMyList/getPageContents',
      getSideEffectsName: 'Review/sideEffectsList/getSideEffectsName',
      getVaccineName: 'Review/vaccineList/getVaccineName',
      getAgeName: 'User/getAgeType/getCodeName',
      getGenderName: 'User/getGenderType/getCodeName',
    }),
  },
  watch: {
    screenFlag (v) {
      if (v) {
        this.fetchPageContent();
      }
    },
  },
  created () {
    // this.fetchPageContent();
  },
  methods: {
    ...mapActions({
      fetchPageContent: 'Review/getMyList/fetchPageContents',
      fetchPage: 'Review/getPage/fetchPageContents',
    }),
    afterModify (detail) {
      this.fetchPageContent();
      this.fetchPage({});
      this.detailContent = detail;
    },
    clickDetail (item) {
      this.detailContent = item;
      this.$refs.detailScreen.screenFlag = true;
    },
    onClickBack () {
      this.screenFlag = false;
    },
    getColor (vaccine) {
      switch (vaccine) {
        case 'ANSEN':
        case 'ANSEN_BOOST':
          return 'rgb(81, 134, 236)';
        case 'PFIZER_FIRST':
        case 'PFIZER_SECOND':
          return 'rgb(180, 110, 188)';
        case 'MODERNA_FIRST':
        case 'MODERNA_SECOND':
          return 'rgb(237, 98, 56)';
        case 'AZ_FIRST':
        case 'AZ_SECOND':
          return 'rgb(98, 176, 182)';
      }
    },
  },
};
</script>

<style>
</style>
