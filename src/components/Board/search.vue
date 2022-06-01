<template>
  <div class="flex bg-white justify-center items-center m-2 p-2 rounded bg-dark">
    <input
      v-model="keyword"
      class="w-full mr-2 outline-none bg-dark"
      placeholder="검색어를 입력해 주세요."
      @keypress.enter="clickSearch"
    >
    <fa-icon
      icon="search"
      style="font-size: 20px; width: 20px"
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
