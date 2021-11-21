<template>
  <div class="p-3">
    <div class="flex justify-between items-center">
      <div class="border border-gray-400 p-2 rounded-lg  w-full m-1 flex justify-between items-center">
        <div class="text-lg ml-1">백신종류</div>
        <div class="m-1 btn btn-outline btn-primary btn-sm">
          {{ detailContent.vaccine }}
        </div>
      </div>
      <div class="border border-gray-400 p-2 rounded-lg  w-full m-1 flex justify-between items-center">
        <div class="text-lg ml-1">접종날짜</div>
        <div class="m-1 btn btn-outline btn-primary btn-sm">
          {{ detailContent.inoculatedDate }}
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div class="border border-gray-400 p-2 rounded-lg  w-full m-1 flex justify-between items-center">
        <div class="text-lg ml-1">나이</div>
        <div class="m-1 btn btn-outline btn-primary btn-sm">
          {{ detailContent.authorAge }}
        </div>
      </div>
      <div class="border border-gray-400 p-2 rounded-lg  w-full m-1 flex justify-between items-center">
        <div class="text-lg ml-1">성별</div>
        <div class="m-1 btn btn-outline btn-primary btn-sm">
          {{ detailContent.authorGender }}
        </div>
      </div>
    </div>
    <div class="border border-gray-400 p-2 rounded-lg  m-1 mb-2 ">
      <div class="flex justify-between items-center">
        <div class="text-lg ml-1">기저질환</div>
        <div class="m-1 btn btn-outline btn-primary btn-sm">
          {{ detailContent.tags.haveDisease }}
        </div>
      </div>
      <div class="h-px bg-gray-200 m-1"></div>
      <div class="p-2">{{ detailContent.diseaseDisc }}</div>
    </div>
    <div class="border border-gray-400 p-2 rounded-lg  m-1 mb-2">
      <div class="text-lg ml-1">백신종류</div>
      <div v-for="(item) in detailContent.sideEffectTypes" :key="item" :value="item"
           class="m-1 btn btn-outline btn-primary btn-sm">
        {{ item }}
      </div>
    </div>
    <div class="border border-gray-400 p-2 rounded-lg m-1 h-24">{{ detailContent.detailDisc }}</div>
  </div>
</template>

<script>
export default {
  name: "DetailCont",
  props: {
    detailContent: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
    }
  },
}
</script>

<style scoped>

</style>
