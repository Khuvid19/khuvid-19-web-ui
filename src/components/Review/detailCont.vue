<template>
  <div class="p-3">
    <div class="flex justify-between items-center">
      <div class="border border-gray-400 p-2 rounded-lg  w-full m-1 flex justify-between items-center">
        <div class="text-lg ml-1">백신종류</div>
        <div class="m-1 btn btn-outline btn-primary btn-sm">
          {{ detailContent.tags.vaccine }}
        </div>
      </div>
      <div class="border border-gray-400 p-2 rounded-lg  w-full m-1 flex justify-between items-center">
        <div class="text-lg ml-1">접종날짜</div>
        <div class="m-1 btn btn-outline btn-primary btn-sm">
          {{ detailContent.tags.inoculatedDate }}
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div class="border border-gray-400 p-2 rounded-lg  w-full m-1 flex justify-between items-center">
        <div class="text-lg ml-1">나이</div>
        <div class="m-1 btn btn-outline btn-primary btn-sm">
          {{ detailContent.tags.userAge }}
        </div>
      </div>
      <div class="border border-gray-400 p-2 rounded-lg  w-full m-1 flex justify-between items-center">
        <div class="text-lg ml-1">성별</div>
        <div class="m-1 btn btn-outline btn-primary btn-sm">
          {{ detailContent.tags.gender }}
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
      <div class="p-2">{{ detailContent.tags.diseaseDisc }}</div>
    </div>
    <div class="border border-gray-400 p-2 rounded-lg  m-1 mb-2">
      <div class="text-lg ml-1">백신종류</div>
      <div v-for="(item) in detailContent.tags.sideEffectTypes" :key="item" :value="item"
           class="m-1 btn btn-outline btn-primary btn-sm">
        {{ item }}
      </div>
    </div>
    <div class="border border-gray-400 p-2 rounded-lg m-1 h-24">{{ detailContent.contents }}</div>
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
      detailContent: {
        id: 1,
        tags: {
          id: 1,
          userAge: '20대',
          gender: '여성',
          inoculatedDate: '2020-10-20',
          vaccine: '화이자 1차',
          sideEffectTypes: ['발열', '메스꺼움', '발열', '메스꺼움', '발열', '메스꺼움', '발열', '메스꺼움', '발열', '메스꺼움'],
          haveDisease: true,
          diseaseDisc: '심장이 안좋아요',
          regDt: '3분전',
          descCont: '너무 아파요 어어어어어어엉엉ㅇ',
        },
        contents: '너무 아파요 어어어엉ㅇ',
      },
    }
  },
}
</script>

<style scoped>

</style>
