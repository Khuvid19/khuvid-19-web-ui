<template>
  <div class="p-3">
    <div class="border border-gray-400 p-2 rounded-lg  m-1 mb-2">
      <div class="text-lg ml-1">백신종류</div>
      <div v-for="(item) in vaccineCodeList" :key="item" :value="item"
           class="m-1 btn btn-outline btn-primary btn-sm">
        {{ item }}
      </div>
    </div>
    <div class="border border-gray-400 p-2 rounded-lg  m-1 mb-2">
      <div class="text-lg ml-1">백신종류</div>
      <div v-for="(item) in diseaseCodeList" :key="item" :value="item"
           class="m-1 btn btn-outline btn-primary btn-sm">
        {{ item }}
      </div>
    </div>
    <div class="border border-gray-400 p-2 rounded-lg  m-1 mb-2 ">
      <div class="text-lg ml-1">기저질환</div>
      <div v-for="(item) in diseaseCodeList" :key="item" :value="item"
           class="m-1 btn btn-outline btn-primary btn-sm">
        {{ item }}
      </div>
      <div class="h-px bg-gray-200 m-1"></div>
      <div class="p-2">{{ vaccineCodeList }}</div>
    </div>
    <div class="border border-gray-400 p-2 rounded-lg  m-1 mb-2">
      <div class="text-lg ml-1">백신종류</div>
      <div v-for="(item) in sideEffectTypesCodeList" :key="item" :value="item"
           class="m-1 btn btn-outline btn-primary btn-sm">
        {{ item }}
      </div>
    </div>
    <div class="border border-gray-400 p-2 rounded-lg m-1 h-24">{{ vaccineCodeList }}</div>
  </div>
</template>

<script>
export default {
  name: "DetailCont",
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      vaccineCodeList: [
        '얀센', '화이자',
      ],
      diseaseCodeList: [
        '있음', '없음',
      ],
      sideEffectTypesCodeList: [
        '통증', '두드러기', '통증', '두드러기', '통증', '두드러기', '통증', '두드러기',
      ],
    }
  },
}
</script>

<style scoped>

</style>
