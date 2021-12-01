<template>
  <client-only>
    <div class="chart-header">
      <div class="card shadow bg-white">
        <div class="casrd-body p-4 stats">
          <div class="tabs">
            <div class="flex justify-between align-middle">
              <button 
                v-for="(item,idx) in vaccineList" 
                :key="idx"
                class="mr-2 mb-1 btn btn-outline gray btn-sm"
                :class="changeBtnColor()"
                @click="ChangeChart(item)">
                {{ item }}
              </button>
            </div>
          </div>
        </div>
      <bar-chart
        class="-mt-8 mb-4" style="width: 95%; margin-left: 2.5%; height:400px;"
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
      current: '',
      label: '화이자 1차',
      borderColor: 'rgb(180, 110, 188)',
      backgroundColor: 'rgb(180, 110, 188)',
      vaccineList: ['화이자 1차', '화이자 2차', '모더나 1차', '모더나 2차', '아스트라제네카 1차', '아스트라제네카 2차', '얀센', '얀센 부스터샷'],
      vaccine: 'PFIZER_FIRST',
      symptomCode: [],
      symptomList: [],
      symptomCount: [],
    }
  },
  computed: {

  },
  created() {
    this.initChart();
    const SYMPTOMLIST = '/review/types/sideEffects'
    axios.get(`/api/v2${SYMPTOMLIST}`).then(res => {
      const data = res.data
      console.log(data);
      for (let i = 0; i < 14; i++) {
        this.symptomCode.push(data[i].code)
        this.symptomList.push(data[i].value)
      }
      console.log(this.symptomCode);
      console.log(this.symptomList);
    })
    const SYMPTOMCOUNT = `review/sideEffects?vaccine=${this.vaccine}`
    axios.get(`/api/v2${SYMPTOMCOUNT}`).then(res => {
      const data2 = res.data
      console.log(data2);
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
        indexAxis: 'y',
        plugins: {
          ...defaultPlugins,
        },
      }
    },
    initData() {
      this.chartData.labels = this.symptomList
      this.chartData.datasets.push({
        label: this.label,
        borderColor: this.borderColor,
        backgroundColor: this.backgroundColor,
        data: Array.from( {length: 14}, (_, i) => this.makeRandomNum(100, 300)),
      })
    },
    changeBtnColor() {
      if (this.current === 'PFIZER')
        return 'PFIZER'
      else if (this.current === 'MODERNA')
        return 'MODERNA'
      else if (this.current === 'AZ')
        return 'AZ'
      else if (this.current === 'ANSEN')
        return 'ANSEN'
    },
    ChangeChart(item) {
      this.label = item;
      if (item.includes("화이자")) {
        // 보라색
        this.current = 'PFIZER'
        this.borderColor = 'rgb(180, 110, 188)'
        this.backgroundColor = 'rgb(180, 110, 188)' 
      }
      else if (item.includes("모더나")) {
        // 빨간색
        this.current = 'MODERNA'
        this.borderColor = 'rgb(237, 98, 56)'
        this.backgroundColor = 'rgb(237, 98, 56)'
      }
      
      else if (item.includes("아스트라제네카")) {
        // 흰색인데 기본색으로 표현
        this.current = 'AZ'
        this.borderColor = 'rgb(98, 176, 182)'
        this.backgroundColor = 'rgb(98, 176, 182)'
      }
      else if (item.includes("얀센")) {
        // 파란색
        this.current = 'ANSEN'
        this.borderColor = 'rgb(81, 134, 236)'
        this.backgroundColor = 'rgb(81, 134, 236)'
      }
      this.chartData.datasets.pop();
      this.initData();
    },
  },
}
</script>

<style scoped lang="scss">

</style>
