<template>
  <div class="w-screen">
    <div class="bg-white flex justify-between items-center m-2 p-2">
      <input v-model="searchInput" class="w-full" type="text" placeholder="검색어를 입력해주세요."/>
      <fa-icon icon="search" class="bg-white" style="font-size: 20px"
               @click="clickSearch"
      />
    </div>
    <div class="h-px bg-gray-200 m-2"></div>
    <div class="bg-white flex justify-start items-center m-2 p-2">
      <fa-icon icon="filter" class="bg-white mr-2" style="font-size: 20px"
               @click="openTagFilter"
      />
      <div v-for="(item) in searchTagList" :key="item" :value="item"
              class="m-1 btn btn-outline btn-primary btn-sm">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewSearchFilter",
  data() {
    return {
      searchInput: '',
      searchTagList: ['발열', '화이자 1차'],
    }
  },
  methods: {
    clickSearch() {
      // 검색 후 리스트 리로드
      console.log('검색 후 리스트 리로드')
    },
    openTagFilter() {

    },
  },
}
</script>

<style scoped>

</style>
