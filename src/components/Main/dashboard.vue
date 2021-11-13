<template>
  <div class="page-status">
    <div class="flex flex-col w-full">
      <div class="dashboard-logo">
        <fa-icon icon="bullhorn" />
        <span>상황판</span>
      </div>
      <div class="status-border grid h-20 card bg-base-300 rounded-box place-items-center">
        <div class="flex flex-row w-full">
          <div class="inoculator-area grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
            전체 확진자<br> {{ all }}
          </div>
          <div class="hidden divider divider-vertical"></div> 
          <div class="inoculator-area grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
            금일 확진자<br> {{ today }}
          </div>
        </div>
      </div> 
      <div class="mt-4"></div>
      <div class="status-border grid h-20 card bg-base-300 rounded-box place-items-center">
        <div class="flex flex-row w-full">
          <div class="inoculator-area text-sm grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
            1차 접종<br>{{ first }}<br>({{ firstPercent }}%)
          </div> 
          <div class="hidden divider divider-vertical"></div> 
          <div class="inoculator-area text-sm grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
            2차 접종<br>{{ second }}<br>({{ secondPercent }}%)
          </div>
          <div class="inoculator-area text-sm grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
            3차 접종<br>{{ third }}<br>({{ thirdPercent }}%)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const convert = require('xml-js')

export default {
  data() {
    return {
      all: '388,351', // 11월 10일 기준 더미 데이터
      today: '2,520',
      first: '',
      second: '',
      third: '',
      firstPercent: '',
      secondPercent: '',
      thirdPercent: '',
    }
  },

  created () {
    const PATH_API = '/irgd/cov19stats.do?list=all'
    axios.get(`/api/v1${PATH_API}`).then(res => {
      const internationalNumberFormat = new Intl.NumberFormat('en-US')
      const xml = res.data
      const json = JSON.parse(convert.xml2json(xml, { compact: true }))
      this.first = json.response.body.items.item[2].firstCnt._text
      this.second = json.response.body.items.item[2].secondCnt._text
      this.third = json.response.body.items.item[2].thirdCnt._text
      this.firstPercent = (this.first / 51667688 * 100).toFixed(1);
      this.secondPercent = (this.second / 51667688 * 100).toFixed(1);
      this.thirdPercent = (this.third / 51667688 * 100).toFixed(1);
      this.first = internationalNumberFormat.format(this.first);
      this.second = internationalNumberFormat.format(this.second);
      this.third = internationalNumberFormat.format(this.third);
    })
  },
}
</script>