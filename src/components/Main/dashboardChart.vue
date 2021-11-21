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
        class="-mt-10 mb-3" style="width: 90%; margin-left: 5%; height:270px;"
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
    }
  },
  computed: {

  },
  created() {
    this.initChart();
    const PATH_API = 'review/types/vaccine'
    axios.get(`/api/v2${PATH_API}`).then(res => {
      const data = res.data;
      console.log(data);
      console.log(data.ANSEN);
    })
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
              size: 22,
            },
          },
        },
      }
    },
    initData(){
      this.chartData.labels = Array.from( {length: 12}, (_, i) => `증상${i+1}`)
      this.chartData.datasets.push({
        label: '1차',
        borderColor: '#f43f5e',
        backgroundColor: '#f43f5e',
        data:  Array.from( {length: 12}, (_, i) => this.makeRandomNum(100, 300)),
      })
      this.chartData.datasets.push({
        label: '2차',
        borderColor: '#0ea5e9',
        backgroundColor: '#0ea5e9',
        data:  Array.from( {length: 12}, (_, i) => this.makeRandomNum(200, 400)),
      })
    },
  },
}
</script>

<style scoped lang="scss">

</style>
