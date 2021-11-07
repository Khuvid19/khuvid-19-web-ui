<template>
  <div>
    <div>
      <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
        <div class="text-lg mb-1 ml-1">백신 종류</div>
        <div>
          <button v-for="(item,idx) in vaccineList" :key="idx"
                  class="m-1 btn btn-outline btn-primary btn-sm">
            {{ item }}
          </button>
        </div>
      </div>
      <div class=" border rounded-box px-3 py-4 mx-4 my-2 bg-white">
        <div class="text-lg mb-1 ml-1">접종 날짜</div>
        <div>
          <v-date-picker v-model="date" :masks="masks" class="inline-block h-full"
          >
            <template #default="{ inputValue, togglePopover }">
              <div class="flex items-center">
                <input
                  :value="inputValue"
                  class="text-center bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-xl focus:outline-none focus:border-blue-500"
                  readonly
                  @click="togglePopover()"
                />
              </div>
            </template>
          </v-date-picker>
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
      <div class="card bordered px-4 py-4 mx-4 my-2 bg-white">
        <div class="form-control">
          <textarea class="textarea h-24 textarea-bordered" placeholder="Bio"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      masks: {
        input: 'YYYY-MM-DD',
      },
      vaccineList: ['화이자', '모더나'],
      bb: ['없음', '있음'],
      cc: [
        '미열', '고열', '접종부위 통증',
        '구토', '메스꺼움', '두통',
        '관절통', '근육통', '피로감',
        '두드러기', '발진', '가려움증',
        '부기', '기타',
      ],
    }
  },
}
</script>

<style>
</style>
