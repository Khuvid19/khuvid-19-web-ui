<template>
  <div>
    <input type="checkbox" class="modal-toggle" :checked="checkFlag">
    <div class="modal items-center">
      <div class="modal-box w-11/12 rounded-box px-0 py-2 h-auto">
        <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
          <div class="text-lg mb-1 ml-1">백신 종류</div>
          <div>
            <button v-for="(item,idx) in vaccineList" :key="idx"
                    class="m-1 btn btn-outline btn-primary btn-sm">
              {{ item }}
            </button>
          </div>
        </div>
        <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
          <div class="text-lg mb-1 ml-1">접종 날짜</div>
          <div>
            <button v-for="(item,idx) in vaccineList" :key="idx"
                    class="m-1 btn btn-outline btn-primary btn-sm">
              {{ item }}
            </button>
          </div>
        </div>
        <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
          <div class="text-lg mb-1 ml-1">기저질환</div>
          <div>
            <button v-for="(item,idx) in bb" :key="idx"
                    class=" m-1 btn btn-outline btn-primary btn-sm">
              {{ item }}
            </button>
          </div>
          <div class="w-full my-2 h-px bg-gray-200"></div>
          <div class="form-control">
            <input type="text" placeholder="username" class="input input-sm input-bordered">
          </div>
        </div>
        <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
          <div class="text-lg mb-1 ml-1">이상반응</div>
          <div>
            <button v-for="(item,idx) in cc" :key="idx"
                    class="m-1 btn btn-outline btn-primary btn-sm">
              {{ item }}
            </button>
          </div>
        </div>
        <div class="modal-action w-full px-4 my-3">
          <button class="btn btn-primary w-full rounded-xl" @click="closeModal">작성완료</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddSimpleCont",
  props:{
    checkFlag: {
      type: Boolean,
      default: null,
    },
  },
  data() {
    return {
      vaccineList: ['화이자', '모더나'],
      bb: ['없음', '있음'],
      cc: [
        '미열', '고열', '접종부위 통증',
        '구토', '메스꺼움', '두통',
        '관절통', '근육통', '피로감',
        '두드러기', '발진', '가려움증',
        '부기', '기타',
      ],
      // checkFlag: false,
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
}
</script>

<style scoped>

</style>
