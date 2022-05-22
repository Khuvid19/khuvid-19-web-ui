<template>
  <div class="w-screen">
    <div class="bg-white flex justify-between items-center m-2 p-2 bg-dark">
      <form @submit.prevent="clickSearch">
        <input
          v-model="detailDisc"
          class="w-full outline-none search-dark"
          placeholder="검색어를 입력해주세요."
        >
      </form>
      <fa-icon
        icon="search"
        class="bg-white"
        style="font-size: 20px"
        @click="clickSearch"
      />
    </div>
    <div class="h-px bg-gray-200 m-2" />
    <div
      class="bg-white flex justify-start items-center m-2 p-2 bg-dark"
      @click="openTagFilter"
    >
      <fa-icon
        icon="filter"
        class="bg-white mr-2"
        style="font-size: 20px"
      />
      <div class="flex w-full overflow-x-scroll bg-dark">
        <div v-if="filterTagList.length===0" class="text-gray-400 search-dark">
          필터로 접종후기를 조회해 보세요.
        </div>
        <div
          v-for="(item) in filterTagList"
          v-else
          v-show="item"
          :key="item"
          :value="item"
          class="m-1 btn btn-outline btn-primary btn-sm"
          style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8"
        >
          <div>ffff{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ReviewSearchFilter',
  props: {
    filterTagList: {
      type: Array,
      default: null,
    },
  },
  data () {
    return {
      detailDisc: '',
    };
  },
  methods: {
    ...mapActions({
      fetchReview: 'Review/getPage/fetchPageContents',
      setPageParams: 'Review/getPage/setPageParams',
    }),
    clickSearch () {
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
      this.setPageParams(filters);
      // this.fetchReview(filters)
      //   .then(() => {
      this.$emit('clickSearch', filters);
      // });
    },
    openTagFilter () {
      this.$emit('clickFilter');
    },
  },
};
</script>

<style scoped>

</style>
