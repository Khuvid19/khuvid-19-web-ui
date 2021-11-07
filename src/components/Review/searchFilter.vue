<template>
  <div>
    <div class="flex bg-white justify-center items-center m-2 p-2 rounded">
      <input class="w-full mr-2 outline-none"/>
      <fa-icon icon="search" class="bg-white" style="font-size: 20px"/>
    </div>
    <div class="w-full my-2 h-px bg-gray-200"></div>
    <div class="p-2 m-2 flex items-center">
      <fa-icon icon="filter" class="bg-white mr-2" style="font-size: 20px"
      @click="clickFilter"/>
      <button v-for="(item,idx) in vaccineList" :key="idx"
              class="m-1 btn bg-white btn-outline btn-primary btn-sm">
        {{ item }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchFilter",
  data() {
    return {
      vaccineList: ['발열', '화이자 1차', '20대'],

    }
  },
  methods: {
    clickFilter() {
      this.$emit('clickFilter')
    },
  },
}
</script>

<style scoped>

</style>
