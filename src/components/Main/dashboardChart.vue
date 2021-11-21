<template>
  <client-only>
    <div class="chart-header">
      <div class="card shadow bg-white">
        <div class="card-body p-4 stats">
          <div class="tabs">
            <div class="flex justify-between align-middle">
              <button v-for="(item,idx) in vaccineList" :key="idx"
                class="mr-2 btn btn-outline btn-primary btn-sm">
                {{ item }}
              </button>
            </div>
          </div>
        </div>
      <bar-chart
        class="-mt-8 mb-2" style="width: 90%; margin-left: 5%; height:270px;"
        :data="chartData"
        :options="chartOptions"
      />
      </div>
    </div>
  </client-only>
</template>

<script>
import axios from 'axios'
import {defaultPlugins, defaultOptions} from "@/plugins/chartJs/defaultOptions";

export default {
  name: 'Chart',
  components: {

  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: null,
      vaccineList: ['화이자 1차', '화이자 2차', '모더나 1차', '모더나 2차', '아스트라제네카 1차', '아스트라제네카 2차', '얀센', '얀센 부스터샷'],
      symptomList: ['두통', '관절통', '붓기', '고열', '근육통', '부위 통증', '미열', '피로감', '메스꺼움', '두드러기'],
      // '발진', '구토', '가려움증', '기타'
    }
  },
  computed: {

  },
  created() {
    this.initChart();

  },
  methods: {
    makeRandomNum(min, max){
      return Math.floor(Math.random() * (max - min) + min)
    },
    initChart(){
      this.initOptions()
      this.initData()
    },
    initOptions() {
      this.chartOptions = {
        ...defaultOptions,
        plugins: {
          ...defaultPlugins,
          title: {
            display: true,
            text: '',
            font: {
              size: 20,
            },
          },
        },
      }
    },
    initData(){
      // this.chartData.labels = Array.from( {length: 10}, (_, i) => `증상${i+1}`)
      this.chartData.labels = this.symptomList
      this.chartData.datasets.push({
        label: '화이자 1차',
        borderColor: 'rgb(98, 176, 182)',
        backgroundColor: 'rgb(98, 176, 182)',
        data: Array.from( {length: 14}, (_, i) => this.makeRandomNum(100, 300)),
      })
      // this.chartData.datasets.push({
      //   label: '2차',
      //   borderColor: '#0ea5e9',
      //   backgroundColor: '#0ea5e9',
      //   data:  Array.from( {length: 12}, (_, i) => this.makeRandomNum(200, 400)),
      // })
    },
  },
}
</script>

<style scoped lang="scss">

</style>
