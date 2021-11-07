<template>
  <div>
    <div>
      <div class="flex mx-4 my-2 gap-2" style="width: calc(100% - 2rem)">
        <div class="w-1/2 card bordered px-1 py-2 bg-white">
          <div class="flex justify-between items-center mx-2">
            <div class="text-lg">백신 종류</div>
            <button class="btn btn-outline btn-primary btn-sm">
              화이자
            </button>
          </div>
        </div>
        <div class="w-1/2 card bordered px-1 py-2 bg-white">
          <div class="flex justify-between items-center mx-2">
            <div class="text-lg">백신 종류</div>
            <button class="btn btn-outline btn-primary btn-sm">
              화이자
            </button>
          </div>
        </div>
      </div>
      <div class="flex mx-4 my-2 gap-2" style="width: calc(100% - 2rem)">
        <div class="w-1/2 card bordered px-1 py-2 bg-white">
          <div class="flex justify-between items-center mx-2">
            <div class="text-lg">나이</div>
            <button class="btn btn-outline btn-primary btn-sm">
              20대
            </button>
          </div>
        </div>
        <div class="w-1/2 card bordered px-1 py-2 bg-white">
          <div class="flex justify-between items-center mx-2">
            <div class="text-lg">성별</div>
            <button class="btn btn-outline btn-primary btn-sm">
              여자
            </button>
          </div>
        </div>
      </div>
      <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
        <div class="flex justify-between items-center">
          <div class="text-lg mb-1 ml-1">기저질환</div>
          <button class=" m-1 btn btn-outline btn-primary btn-sm">
            있음
          </button>
        </div>
        <div class="w-full my-2 h-px bg-gray-200"></div>
        <div class="">
          심장이 안좋아요.
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
      <div class="card bordered px-4 py-4 mx-4 my-2 bg-white">
        <div class="">
          첫날은 괜찮았는데 둘쨰날 너무 아팠어요.
          엉어엉ㅇ
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cc: [
        '고열', '접종부위 통증',
        '구토', '메스꺼움',
      ],
    }
  },
}
</script>

<style>
</style>
