<template>
  <div class="w-screen">
    <div class="bg-white flex justify-between items-center m-2 p-2">
      <input v-model="detailDisc" class="w-full" type="text" placeholder="검색어를 입력해주세요."/>
      <fa-icon icon="search" class="bg-white" style="font-size: 20px"
               @click="clickSearch"
      />
    </div>
    <div class="h-px bg-gray-200 m-2"></div>
    <div class="bg-white flex justify-start items-center m-2 p-2">
      <fa-icon icon="filter" class="bg-white mr-2" style="font-size: 20px"
               @click="openTagFilter"
      />
      <div class="flex w-full overflow-x-scroll">
        <div v-for="(item) in filterTagList" v-show="item" :key="item"
             :value="item"
             class="m-1 btn btn-outline btn-primary btn-sm">
          <div>{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ReviewSearchFilter",
  props: {
    filterTagList: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      detailDisc: '',
      searchTagList: ['발열', '화이자 1차'],
    }
  },
  methods: {
    ...mapActions({
      fetchReview: 'Review/getPage/fetchPageContents',
    }),
    clickSearch() {
      const filters = {
        authorAge: this.authorAge,
        authorGender: this.authorGender,
        detailDisc: this.detailDisc,
        startInoculated: this.startInoculated,
        endInoculated: this.endInoculated,
        haveDisease: this.haveDisease,
        sideEffects: this.sideEffects,
        vaccine: this.vaccine,
      };
      this.fetchReview({
        page: 0,
        filters,
      });
    },
    openTagFilter() {
      this.$emit('clickFilter')

    },
  },
}
</script>

<style scoped>

</style>
