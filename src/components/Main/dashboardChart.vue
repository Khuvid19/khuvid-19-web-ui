<template>
  <client-only>
    <div class="chart-header">
      <div class="chart-logo">
        <fa-icon :icon="['far', 'chart-bar']" />
        <span>&nbsp;증상</span>
      </div>
      <bar-chart
        class="w-full chart" style="height: 330px"
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </client-only>
</template>

<script>
import {defaultPlugins, defaultOptions} from "@/plugins/chartJs/defaultOptions";

export default {
  name: 'TestChart',
  components: {

  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: null,
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
