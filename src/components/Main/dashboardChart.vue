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
                @click="changeChart(item)">
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
      allCount: 0,
      symptomCode: [],
      symptomList: [],
      symptomCount: {},
    }
  },
  created() {
    console.log("야 인마");
    console.log(this.vaccine);
    this.initChart();
  },
  methods: {
    makeRandomNum(min, max){
      return Math.floor(Math.random() * (max - min) + min)
    },
    async initChart(){
      this.initOptions()
      await this.getAPI()
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
    async initData() {
      this.chartData.labels = this.symptomList
      await this.getAPI()
      this.chartData.datasets.push({
        label: this.label,
        borderColor: this.borderColor,
        backgroundColor: this.backgroundColor,
        // data: Array.from( {length: 14}, (_, i) => this.makeRandomNum(100, 300)),
        data: Array.from( {length: 14}, (_, i) => (this.symptomCount[this.symptomCode[i]]/this.allCount) * 100),
      })
    },
    async getAPI() {
      try {
        this.allCount = 0
        this.symptomCount = {}
        this.symptomCode = []
        this.symptomList = []
        const SYMPTOMLIST = '/review/types/sideEffects'
        await axios.get(`/api/v2${SYMPTOMLIST}`).then(res => {
          const data = res.data
          for (let i = 0; i < 14; i++) {
            this.symptomCode.push(data[i].code)
            this.symptomList.push(data[i].value)
          }
        })
        console.log(this.vaccine);
        const SYMPTOMCOUNT = `review/sideEffects?vaccine=${this.vaccine}`
        await axios.get(`/api/v2${SYMPTOMCOUNT}`).then(res => {
          const data = res.data
          for (data.key in data) {
            this.symptomCount[data.key] = data[data.key]
            this.allCount += data[data.key]
          }
          console.log(this.symptomCount);
          console.log(this.allCount);
        })
      } catch (error) {
        console.log(error);
      }
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
    changeChart(item) {
      this.label = item;
      if (item.includes("화이자")) {
        // 보라색
        this.current = 'PFIZER'
        if (item.includes("1차")) {
          this.vaccine = 'PFIZER_FIRST'
        } else {
          this.vaccine = 'PFIZER_SECOND'
        }
        this.borderColor = 'rgb(180, 110, 188)'
        this.backgroundColor = 'rgb(180, 110, 188)' 
      }
      else if (item.includes("모더나")) {
        // 빨간색
        this.current = 'MODERNA'
        if (item.includes("1차")) {
          this.vaccine = 'MODERNA_FIRST'
        } else {
          this.vaccine = 'MODERNA_SECOND'
        }
        this.borderColor = 'rgb(237, 98, 56)'
        this.backgroundColor = 'rgb(237, 98, 56)'
      }
      else if (item.includes("아스트라제네카")) {
        // 흰색인데 기본색으로 표현
        this.current = 'AZ'
        if (item.includes("1차")) {
          this.vaccine = 'AZ_FIRST'
        } else {
          this.vaccine = 'AZ_SECOND'
        }
        this.borderColor = 'rgb(98, 176, 182)'
        this.backgroundColor = 'rgb(98, 176, 182)'
      }
      else if (item.includes("얀센")) {
        // 파란색
        this.current = 'ANSEN'
        if (item.includes("부스터샷")) {
          this.vaccine = 'ANSEN_BOOST'
        } else {
          this.vaccine = 'ANSEN'
        }
        this.borderColor = 'rgb(81, 134, 236)'
        this.backgroundColor = 'rgb(81, 134, 236)'
      }
      this.chartData.datasets.pop();
      this.initData();
    },
  },
}
</script>