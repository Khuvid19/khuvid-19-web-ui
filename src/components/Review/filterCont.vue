<template>
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
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">성별</div>
      <div>
        <button v-for="(item,idx) in gender" :key="idx"
                class=" m-1 btn btn-outline btn-primary btn-sm">
          {{ item }}
        </button>
      </div>
    </div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">나이</div>
      <div>
        <button v-for="(item,idx) in age" :key="idx"
                class="m-1 btn btn-outline btn-primary btn-sm">
          {{ item }}
        </button>
      </div>
    </div>
    <div class="card bordered px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">기저질환</div>
      <div>
        <button v-for="(item,idx) in bb" :key="idx"
                class="m-1 btn btn-outline btn-primary btn-sm">
          {{ item }}
        </button>
      </div>
    </div>
    <div class="border rounded-box px-3 py-4 mx-4 my-2 bg-white">
      <div class="text-lg mb-1 ml-1">처방날짜</div>
      <div>
        <v-date-picker v-model="range" is-range :masks="masks">
          <template #default="{ inputValue, inputEvents }">
            <div class="flex justify-between items-center">
              <input
                :value="inputValue.start"
                class="border px-2 py-1 w-44 rounded focus:outline-none focus:border-indigo-300"
                v-on="inputEvents.start"
              />
              <svg
                class="w-4 h-4 mx-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <input
                :value="inputValue.end"
                class="border px-2 py-1 w-44 rounded focus:outline-none focus:border-indigo-300"
                v-on="inputEvents.end"
              />
            </div>
          </template>
        </v-date-picker>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      range: {
        start: new Date(2020, 9, 12),
        end: new Date(2020, 9, 16),
      },
      masks: {
        input: 'YYYY-MM-DD',
      },
      vaccineList: ['화이자', '모더나'],
      bb: ['없음', '있음'],
      gender: ['여자', '남자'],
      age: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
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
