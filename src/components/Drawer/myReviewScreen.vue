<template>
  <full-screen
    v-model="screenFlag"
    title="작성 후기"
    @onClickBack="onClickBack"
  >
    <div class="w-screen review-list overflow-y-scroll">
      <div v-for="(item,idx) in getPageContents" :key="idx">
<!--        <div class="card shadow m-2 bg-white" @click="$emit('clickDetail',item)">-->
        <div class="card shadow m-2 bg-white" @click="clickDetail(item)">
          <div class="card-body p-4">
            <div class="flex justify-between align-middle mb-2">
              <div>
                <div class="flex justify-start items-center">
                  <div class="m-1 text-sm font-semibold">{{ getVaccineName(item.vaccine) }}</div>
                  <div class="m-1 text-sm font-semibold">| {{ getGenderName(item.authorGender) }}</div>
                  <div class="m-1 text-sm font-semibold">| {{ getAgeName(item.authorAge) }}</div>
                  <div v-if="item.haveDisease" class="m-1 text-sm font-semibold">
                    | {{ item.diseaseDisc }}
                  </div>
                  <div class="m-1 text-sm font-semibold">| {{ item.inoculatedDate.slice(0,10) }}</div>
                </div>
              </div>
              <div class="text-2xs flex items-center">
                {{ mm_formatDate(item.createdDate) }}
              </div>
            </div>
            <div>
              <div v-for="(effec,i) in item.sideEffects" :key="i"
                   class="mr-2 mb-2 btn btn-outline btn-primary btn-sm"
                   style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
                {{ getSideEffectsName(effec) }}
              </div>
            </div>
            <p v-show="item.detailDisc" class="text-sm ml-1 mt-1">
              {{ item.detailDisc }}
            </p>
          </div>
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
import {mapActions, mapGetters} from "vuex";
import fullScreen from '../_Common/fullScreen'
import DetailScreen from './myReviewDetail'
export default {
  components: {
    fullScreen,
    DetailScreen,
  },
  data() {
    return {
      screenFlag: false,
      detailContent:{
        authorAge: "",
        authorGender: "",
        authorId: 0,
        createdDate: "",
        detailDisc: "",
        diseaseDisc: "",
        haveDisease: true,
        id: 0,
        inoculatedDate: "",
        sideEffects: [],
        vaccine: "",
      },
    }
  },
  computed: {
    ...mapGetters({
      getPageContents:'Review/getMyList/getPageContents',
      getSideEffectsName: 'Review/sideEffectsList/getSideEffectsName',
      getVaccineName: 'Review/vaccineList/getVaccineName',
      getAgeName: 'User/getAgeType/getCodeName',
      getGenderName: 'User/getGenderType/getCodeName',
    }),
  },
  watch:{
    screenFlag(v){
      if(v){
        this.fetchPageContent()
      }
    },
  },
  created() {
    // this.fetchPageContent();
  },
  methods: {
    ...mapActions({
      fetchPageContent:'Review/getMyList/fetchPageContents',
      fetchPage:'Review/getPage/fetchPageContents',
    }),
    afterModify(detail){
      this.fetchPageContent()
      this.fetchPage({})
      this.detailContent = detail;
    },
    clickDetail(item){
      this.detailContent = item;
      this.$refs.detailScreen.screenFlag = true
    },
    onClickBack() {
      this.screenFlag = false
    },
  },
}
</script>

<style>
</style>
