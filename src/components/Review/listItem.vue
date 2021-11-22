<template>
  <div class="w-screen review-list overflow-y-scroll">
    <div v-for="(item,idx) in getReviewList" :key="idx">
      <div class="card shadow m-2 bg-white" @click="$emit('clickDetail',item)">
        <div class="card-body p-4">
          <div class="flex justify-between align-middle mb-2">
            <div>
              <div class="flex justify-start items-center">
                <div class="m-1 text-sm">{{ getVaccineName(item.vaccine) }}</div>
                <div class="m-1 text-sm">| {{ getGenderName(item.authorGender) }}</div>
                <div class="m-1 text-sm">| {{ getAgeName(item.authorAge) }}</div>
                <div v-if="item.haveDisease" class="m-1 text-sm">
                  | {{ item.diseaseDisc }}
                </div>
                <div class="m-1 text-sm">| {{ item.inoculatedDate.slice(0,10) }}</div>
              </div>
            </div>
            <div class="text-2xs flex items-center">
              {{ item.createdDate.slice(5,7) }}월
              {{ item.createdDate.slice(8,10) }}일
            </div>
          </div>
          <div>
            <div v-for="(effec,i) in item.sideEffects" :key="i"
                    class="mr-2 mb-2 btn btn-outline btn-primary btn-sm">
              {{ getSideEffectsName(effec) }}
            </div>
          </div>
          <p class="text-xs mb-2">
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ListCont",
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

<style scoped>

</style>
