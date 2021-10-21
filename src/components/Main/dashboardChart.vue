<template>
  <client-only>
    <bar-chart
      class="w-full" style="height: 400px"
      :data="chartData"
      :options="chartOptions"
    />
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
            text: '테스트입니다.',
            font: {
              size: 22,
            },
          },
        },
      }
    },
    initData(){
      this.chartData.labels = Array.from( {length: 12}, (_, i) => `${i+1}월`)
      this.chartData.datasets.push({
        label: '확진자1',
        borderColor: '#f43f5e',
        backgroundColor: '#f43f5e',
        data:  Array.from( {length: 12}, (_, i) => this.makeRandomNum(100, 300)),
      })
      this.chartData.datasets.push({
        label: '확진자2',
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
