<template>
  <div>
    <button @click="$emit('clickModify')">수정</button>
    <button @click="$emit('clickRemove')">삭제</button>
    <div>
      <div class="flex mx-4 my-2 gap-2" style="width: calc(100% - 2rem)">
        <div class="w-1/2 card bordered px-1 py-2 bg-white">
          <div class="flex justify-between items-center mx-2">
            <div class="text-lg">백신 종류</div>
            <div class="btn btn-outline btn-primary btn-sm"
                 style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
              {{ getVaccineName(detailContent.vaccine) }}
            </div>
          </div>
        </div>
        <div class="w-1/2 card bordered px-1 py-2 bg-white">
          <div class="flex justify-between items-center mx-2">
            <div class="text-lg">접종날짜</div>
            <div class="btn btn-outline btn-primary btn-sm"
                 style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
              {{ detailContent.inoculatedDate.slice(0,10) }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex mx-4 my-2 gap-2" style="width: calc(100% - 2rem)">
        <div class="w-1/2 card bordered px-1 py-2 bg-white">
          <div class="flex justify-between items-center mx-2">
            <div class="text-lg">나이</div>
            <div class="btn btn-outline btn-primary btn-sm"
                 style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
              {{ getAgeName(detailContent.authorAge) }}
            </div>
          </div>
        </div>
        <div class="w-1/2 card bordered px-1 py-2 bg-white">
          <div class="flex justify-between items-center mx-2">
            <div class="text-lg">성별</div>
            <div class="btn btn-outline btn-primary btn-sm"
                 style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
              {{ getGenderName(detailContent.authorGender) }}
            </div>
          </div>
        </div>
      </div>
      <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
        <div class="flex justify-between items-center">
          <div class="text-lg mb-1 ml-1">기저질환</div>
          <div class="m-1 btn btn-outline btn-primary btn-sm"
               style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
            {{ detailContent.haveDisease==='true'?'있음':'없음' }}
          </div>
        </div>
        <div v-show="detailContent.haveDisease==='true'" class="w-full my-2 h-px bg-gray-200"></div>
        <div v-show="detailContent.haveDisease==='true'">
          {{ detailContent.diseaseDisc }}
        </div>
      </div>
      <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
        <div class="text-lg mb-1 ml-1">이상반응</div>
        <div>
          <div v-for="(item,idx) in detailContent.sideEffects" :key="idx"
                  class="m-1 btn  btn-primary btn-sm"
               style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
            {{ getSideEffectsName(item) }}
          </div>
        </div>
      </div>
      <div class="card bordered px-4 py-4 mx-4 my-2 bg-white">
        <div class="">
          {{ detailContent.detailDisc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    detailContent: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      getReviewList: 'Review/getPage/getPageContents',
      getSideEffectsName: 'Review/sideEffectsList/getSideEffectsName',
      getVaccineName: 'Review/vaccineList/getVaccineName',
      getAgeName: 'User/getAgeType/getCodeName',
      getGenderName: 'User/getGenderType/getCodeName',
    }),
  },
  created() {
    this.fetchSideEffectsName();
    this.fetchVaccineName();
    this.fetchAgeName();
    this.fetchGenderName();
  },
  methods: {
    ...mapActions({
      fetchSideEffectsName: 'Review/sideEffectsList/fetchListContents',
      fetchVaccineName: 'Review/vaccineList/fetchListContents',
      fetchAgeName: 'User/getAgeType/fetchListContents',
      fetchGenderName: 'User/getGenderType/fetchListContents',
    }),
  },
}
</script>

<style>
</style>
