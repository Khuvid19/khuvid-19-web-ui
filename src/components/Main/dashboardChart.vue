<template>
  <client-only>
    <div class="chart-header">
      <div class="card shadow bg-white">
        <div class="cards-body p-4 ml-2 mr-2 stats">
          <div class="tabs -ml-3">
            <div class="flex justify-between align-middle">
              <button
                v-for="(item,idx) in vaccineList"
                :key="idx"
                class="mr-2 mb-1 btn btn-outline gray btn-sm"
                :class="[changeBtnColor(item), hoverColor(idx)]"
                @click="changeChart(item)"
              >
                {{ item }}
              </button>
            </div>
          </div>
        </div>
        <div class="divline -mt-2 mb-2" />
        <bar-chart
          class="-mt-8 mb-4"
          style="width: 95%; margin-left: 2%; height:400px;"
          :data="chartData"
          :options="chartOptions"
        />
      </div>
    </div>
  </client-only>
</template>

<script>
import axios from 'axios';
import { defaultPlugins, defaultOptions } from '@/plugins/chartJs/defaultOptions';

export default {
  name: 'Chart',
  data () {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: null,
      current: '화이자 1차',
      borderColor: 'rgb(180, 110, 188)',
      backgroundColor: 'rgb(180, 110, 188)',
      vaccineList: [],
      vaccine: 'PFIZER_FIRST',
      allCount: 0,
      symptomCode: [],
      symptomList: [],
      symptomCount: {},
    };
  },
  created () {
    const VACCINELIST = '/review/types/vaccine';
    axios.get(`/api/v2${VACCINELIST}`).then((res) => {
      const data = res.data;
      for (let i = 0; i < data.length; i++) {
        this.vaccineList.push(data[i].value);
      }
    });
    const SYMPTOMLIST = '/review/types/sideEffects';
    axios.get(`/api/v2${SYMPTOMLIST}`).then((res) => {
      const data = res.data;
      for (let i = 0; i < data.length; i++) {
        this.symptomCode.push(data[i].code);
        this.symptomList.push(data[i].value);
      }
    });
    this.initChart();
  },
  methods: {
    async initChart () {
      this.initOptions();
      await this.getAPI();
      this.initData();
    },
    initOptions () {
      this.chartOptions = {
        ...defaultOptions,
        indexAxis: 'y',
        scales: {
          x: {
            ticks: {
              callback (value) {
                return value + '%';
              },
            },
          },
        },
        plugins: {
          ...defaultPlugins,
        },
      };
    },
    async initData () {
      this.chartData.labels = this.symptomList;
      await this.getAPI();
      this.chartData.datasets.push({
        borderColor: this.borderColor,
        backgroundColor: this.backgroundColor,
        data: Array.from({ length: 14 }, (_, i) => (this.symptomCount[this.symptomCode[i]] / this.allCount) * 100),
      });
    },
    async getAPI () {
      try {
        this.allCount = 0;
        this.symptomCount = {};
        const SYMPTOMCOUNT = `review/sideEffects?vaccine=${this.vaccine}`;
        await axios.get(`/api/v2${SYMPTOMCOUNT}`).then((res) => {
          const data = res.data;
          this.allCount = data.totalPeopleCount;
          const sideEffects = data.sideEffects;
          for (sideEffects.key in sideEffects) {
            this.symptomCount[sideEffects.key] = sideEffects[sideEffects.key];
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    hoverColor (idx) {
      if (idx === 0 || idx === 1) {
        return 'hoverPFIZER';
      } else if (idx === 2 || idx === 3) {
        return 'hoverMODERNA';
      } else if (idx === 4 || idx === 5) {
        return 'hoverAZ';
      } else {
        return 'hoverANSEN';
      }
    },
    changeBtnColor (item) {
      if (this.current === item) {
        if (item.includes('화이자')) {
          return 'PFIZER';
        } else if (item.includes('모더나')) {
          return 'MODERNA';
        } else if (item.includes('아스트라제네카')) {
          return 'AZ';
        } else if (item.includes('얀센')) {
          return 'ANSEN';
        }
      }
    },
    changeChart (item) {
      this.current = item;
      if (item.includes('화이자')) {
        // 보라색
        if (item.includes('1차')) {
          this.vaccine = 'PFIZER_FIRST';
        } else {
          this.vaccine = 'PFIZER_SECOND';
        }
        this.borderColor = 'rgb(180, 110, 188)';
        this.backgroundColor = 'rgb(180, 110, 188)';
      } else if (item.includes('모더나')) {
        // 빨간색
        if (item.includes('1차')) {
          this.vaccine = 'MODERNA_FIRST';
        } else {
          this.vaccine = 'MODERNA_SECOND';
        }
        this.borderColor = 'rgb(237, 98, 56)';
        this.backgroundColor = 'rgb(237, 98, 56)';
      } else if (item.includes('아스트라제네카')) {
        // 기본색
        if (item.includes('1차')) {
          this.vaccine = 'AZ_FIRST';
        } else {
          this.vaccine = 'AZ_SECOND';
        }
        this.borderColor = 'rgb(98, 176, 182)';
        this.backgroundColor = 'rgb(98, 176, 182)';
      } else if (item.includes('얀센')) {
        // 파란색
        if (item.includes('부스터샷')) {
          this.vaccine = 'ANSEN_BOOST';
        } else {
          this.vaccine = 'ANSEN';
        }
        this.borderColor = 'rgb(81, 134, 236)';
        this.backgroundColor = 'rgb(81, 134, 236)';
      }
      this.chartData.datasets.pop();
      this.initData();
    },
  },
};
</script>
