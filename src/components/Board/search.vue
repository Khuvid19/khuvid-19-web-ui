<template>
  <div class="flex bg-white justify-center items-center m-2 p-2 rounded">
    <input
      v-model="keyword"
      class="w-full mr-2 outline-none"
      placeholder="검색어를 입력해주세요."
      @keyup.enter="clickSearch"
    >
    <fa-icon
      icon="search"
      class="bg-white"
      style="font-size: 20px"
      @click="clickSearch"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: '',
    };
  },
  methods: {
    clickSearch () {
      this.$emit('searchKeyword', this.keyword);
    },
  },
};
</script>

<style>
</style>
