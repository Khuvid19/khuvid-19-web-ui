<template>
  <div class="w-screen review-list overflow-y-scroll">
    <div v-for="(item,index) in listContents" :key="index">
      <div class="h-auto bg-white m-2 p-3 rounded-xl shadow
      flex justify-between items-start"
           @click="clickDetail(item.id)"
      >
        <div>
          <div class="flex justify-start items-center">
            <div class="m-1 text-sm">{{ item.vaccine }}</div>
            <div class="m-1 text-sm">| {{ item.gender }}</div>
            <div class="m-1 text-sm">| {{ item.userAge }}</div>
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
        <div class="w-12 text-sm text-right text-gray-500">{{ item.regDt }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  data() {
    return {
      listContents: [
        {
          id: 1,
          userAge: '20대',
          gender: '여성',
          inoculatedDate: '2020-10-20',
          vaccine: '화이자 1차',
          sideEffectTypes: ['발열', '메스꺼움'],
          haveDisease: false,
          regDt: '3분전',
          descCont: '너무 아파요 어어어어어어엉엉ㅇ',
        },
        {
          id: 2,
          userAge: '10대 이하',
          gender: '여성',
          inoculatedDate: '2020-10-20',
          vaccine: '얀센',
          sideEffectTypes: ['오한', '통증', '두드러기', '발열', '메스꺼움'],
          haveDisease: true,
          diseaseDisc: '기저질환',
          regDt: '4분전',
        },
        {
          id: 2,
          userAge: '10대 이하',
          gender: '여성',
          inoculatedDate: '2020-10-20',
          vaccine: '얀센',
          sideEffectTypes: ['오한', '통증', '두드러기', '발열', '메스꺼움'],
          haveDisease: true,
          diseaseDisc: '기저질환',
          regDt: '4분전',
        },
        {
          id: 2,
          userAge: '10대 이하',
          gender: '여성',
          inoculatedDate: '2020-10-20',
          vaccine: '얀센',
          sideEffectTypes: ['오한', '통증', '두드러기', '발열', '메스꺼움'],
          haveDisease: true,
          diseaseDisc: '기저질환',
          regDt: '4분전',
        }, {
          id: 2,
          userAge: '10대 이하',
          gender: '여성',
          inoculatedDate: '2020-10-20',
          vaccine: '얀센',
          sideEffectTypes: ['오한', '통증', '두드러기', '발열', '메스꺼움'],
          haveDisease: true,
          diseaseDisc: '기저질환',
          regDt: '4분전',
        },
        {
          id: 2,
          userAge: '10대 이하',
          gender: '여성',
          inoculatedDate: '2020-10-20',
          vaccine: '얀센',
          sideEffectTypes: ['오한', '통증', '두드러기', '발열', '메스꺼움'],
          haveDisease: true,
          diseaseDisc: '기저질환',
          regDt: '4분전',
        },
        {
          id: 3,
          userAge: '20대',
          gender: '여성',
          inoculatedDate: '2020-10-20',
          vaccine: '화이자 1차',
          sideEffectTypes: ['발열', '메스꺼움'],
          haveDisease: false,
          regDt: '3분전',
          descCont: '생각보다 안아픈데? 생각보다 안아픈데? 생각보다 안아픈데? 생각보다 안아픈데? ',
        },
        {
          id: 4,
          userAge: '10대 이하',
          gender: '여성',
          inoculatedDate: '2020-10-20',
          vaccine: '얀센',
          sideEffectTypes: ['오한', '통증', '두드러기'],
          haveDisease: true,
          diseaseDisc: '기저질환',
          regDt: '4분전',
        },
        {
          id: 5,
          userAge: '20대',
          gender: '여성',
          inoculatedDate: '2020-10-20',
          vaccine: '화이자 1차',
          sideEffectTypes: ['발열', '메스꺼움'],
          haveDisease: false,
          regDt: '3분전',
          descCont: '너무 아파요 어어어어어어엉엉ㅇ',
        },
        {
          id: 6,
          userAge: '10대 이하',
          gender: '여성',
          inoculatedDate: '2020-10-20',
          vaccine: '얀센',
          sideEffectTypes: ['오한', '통증', '두드러기'],
          haveDisease: true,
          diseaseDisc: '기저질환',
          regDt: '4분전',
        },
        {
          id: 7,
          userAge: '20대',
          gender: '여성',
          inoculatedDate: '2020-10-20',
          vaccine: '화이자 1차',
          sideEffectTypes: ['발열', '메스꺼움'],
          haveDisease: false,
          regDt: '3분전',
          descCont: '생각보다 안아픈데? 생각보다 안아픈데? 생각보다 안아픈데? 생각보다 안아픈데? ',
        },
        {
          id: 8,
          userAge: '10대 이하',
          gender: '여성',
          inoculatedDate: '2020-10-20',
          vaccine: '얀센',
          sideEffectTypes: ['오한', '통증'],
          haveDisease: true,
          diseaseDisc: '기저질환',
          regDt: '4분전',
        },
      ],
    }
  },
  methods: {
    clickDetail(id) {
      this.$emit('clickDetail',id)
    },
  },
}
</script>

<style scoped>

</style>
