<template>
  <div>
    <div v-if="getPageContents.length>0" class="w-screen review-list overflow-y-scroll">
      <div v-for="(item,index) in getPageContents" :key="index">
        <div class="h-auto bg-white m-2 p-3 rounded-xl shadow
      flex justify-between items-start"
             @click="clickDetail(item)"
        >
          <div>
            <div class="flex justify-start items-center">
              <div class="m-1 text-sm">{{ item.vaccine }}</div>
              <div class="m-1 text-sm">| {{ item.authorGender }}</div>
              <div class="m-1 text-sm">| {{ item.authorAge }}</div>
              <div v-if="item.haveDisease" class="m-1 text-sm">
                | {{ item.diseaseDisc }}
              </div>
              <div class="m-1 text-sm">| {{ item.inoculatedDate }}</div>
            </div>
            <div class="flex justify-start items-center">
              <div v-for="(type,idx) in item.sideEffectTypes" :key="idx"
                   class="m-1 btn btn-outline btn-primary btn-sm">
                {{ type }}
              </div>
            </div>
            <div v-if="item.descCont" class="p-2">
              {{ item.descCont }}
            </div>
          </div>
          <div class="w-12 text-sm text-right text-gray-500">{{ item.createdDate }}</div>
        </div>
      </div>
    </div>
    <div v-else class="w-screen review-list overflow-y-scroll">
      작성된 접종후기가 존재하지 않습니다.
    </div>
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ListItem",
  computed: {
    ...mapGetters({
      getPageContents: 'Review/getPage/getPageContents',
    }),
  },
  methods: {
    clickDetail(item) {
      this.$emit('clickDetail', item)
    },
  },
}
</script>

<style scoped>

</style>
