<template>
  <div class="chart-header">
    <div class="card shadow bg-white">
      <div class="cards-body p-4 ml-2 mr-2 stats">
        <div class="tabs -ml-4">
          <div class="flex justify-between align-middle">
            <button
              v-for="(item,idx) in vaccineList"
              :key="idx"
              class="mr-2 mb-1 btn btn-outline gray btn-sm btn-chart"
              :class="[changeBtnColor(item), hoverColor(item)]"
              @click="changeChart(item)"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </div>
      <div class="divline -mt-2 mb-2" />
      <client-only>
        <bar-chart
          class="-mt-8 mb-4"
          style="width: 95%; margin-left: 2%; height:400px;"
          :data="chartData"
          :options="chartOptions"
        />
      </client-only>
    </div>
  </div>
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
      chartFontColor: 'rgb(120, 120, 120)',
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
    this.$root.$refs.dashboardChart = this;
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
              color: this.chartFontColor,
              callback (value) {
                return value + '%';
              },
            },
          },
          y: {
            ticks: {
              color: this.chartFontColor,
            },
          },
        },
        plugins: {
          ...defaultPlugins,
          tooltip: {
            padding: 7,
            caretPadding: 8,
            yAlign: 'top',
            callbacks: {
              label (context) {
                const NumberFormat = new Intl.NumberFormat('en-US');
                const idx = context.dataIndex;
                const tooltip = context.dataset.data[idx].toFixed(1);
                return NumberFormat.format(tooltip) + '%';
              },
            },
          },
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
    hoverColor (item) {
      if (item.includes('화이자')) {
        return 'hoverPFIZER';
      } else if (item.includes('모더나')) {
        return 'hoverMODERNA';
      } else if (item.includes('AZ')) {
        return 'hoverAZ';
      } else if (item.includes('얀센')) {
        return 'hoverANSEN';
      } else if (item.includes('소아')) {
        return 'hoverINFANT';
      }
    },
    changeBtnColor (item) {
      if (this.current === item) {
        if (item.includes('화이자')) {
          return 'PFIZER';
        } else if (item.includes('모더나')) {
          return 'MODERNA';
        } else if (item.includes('AZ')) {
          return 'AZ';
        } else if (item.includes('얀센')) {
          return 'ANSEN';
        } else if (item.includes('소아')) {
          return 'INFANT';
        }
      }
    },
    // 차트 색 변경
    changeChart (item) {
      this.current = item;
      const darkFlag = document.documentElement.classList.contains('dark');
      if (item.includes('화이자')) {
        // 보라색
        if (item.includes('1차')) {
          this.vaccine = 'PFIZER_FIRST';
        } else if (item.includes('2차')) {
          this.vaccine = 'PFIZER_SECOND';
        } else {
          this.vaccine = 'PFIZER_THIRD';
        }
        this.borderColor = 'rgb(180, 110, 188)';
        this.backgroundColor = 'rgb(180, 110, 188)';
        if (darkFlag === true) {
          this.borderColor = 'rgb(164, 99, 171)';
          this.backgroundColor = 'rgb(164, 99, 171)';
        }
      } else if (item.includes('모더나')) {
        // 빨간색
        if (item.includes('1차')) {
          this.vaccine = 'MODERNA_FIRST';
        } else if (item.includes('2차')) {
          this.vaccine = 'MODERNA_SECOND';
        } else {
          this.vaccine = 'MODERNA_THIRD';
        }
        this.borderColor = 'rgb(237, 98, 56)';
        this.backgroundColor = 'rgb(237, 98, 56)';
        if (darkFlag === true) {
          this.borderColor = 'rgb(180, 85, 30)';
          this.backgroundColor = 'rgb(180, 85, 30)';
        }
      } else if (item.includes('AZ')) {
        // 기본색
        if (item.includes('1차')) {
          this.vaccine = 'AZ_FIRST';
        } else {
          this.vaccine = 'AZ_SECOND';
        }
        this.borderColor = 'rgb(98, 176, 182)';
        this.backgroundColor = 'rgb(98, 176, 182)';
        if (darkFlag === true) {
          this.borderColor = 'rgb(65, 125, 135)';
          this.backgroundColor = 'rgb(65, 125, 135)';
        }
      } else if (item.includes('얀센')) {
        // 파란색
        if (item.includes('부스터샷')) {
          this.vaccine = 'ANSEN_BOOST';
        } else {
          this.vaccine = 'ANSEN';
        }
        this.borderColor = 'rgb(81, 134, 236)';
        this.backgroundColor = 'rgb(81, 134, 236)';
        if (darkFlag === true) {
          this.borderColor = 'rgb(50, 95, 175)';
          this.backgroundColor = 'rgb(50, 95, 175)';
        }
      } else if (item.includes('소아')) {
        // 파란색
        if (item.includes('1차')) {
          this.vaccine = 'INFANT_FIRST';
        } else {
          this.vaccine = 'INFANT_SECOND';
        }
        this.borderColor = 'rgb(144, 209, 169)';
        this.backgroundColor = 'rgb(144, 209, 169)';
        if (darkFlag === true) {
          this.borderColor = 'rgb(82, 142, 105)';
          this.backgroundColor = 'rgb(82, 142, 105)';
        }
      }
      this.chartData.datasets.pop();
      this.initData();
    },
  },
};
</script>
