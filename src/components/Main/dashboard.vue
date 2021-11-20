<template>
  <div class="page-status flex flex-col w-full">
    <div class="w-full shadow stats">
    <div class="stat place-items-center place-content-center">
      <div class="stat-title">누적 확진자</div> 
      <div class="stat-value text-success">{{ all }}</div> 
      <!-- <div class="stat-desc text-success">↗︎ 2,520</div> -->
    </div> 
    <div class="stat place-items-center place-content-center">
      <div class="stat-title">신규 확진자</div> 
      <div class="stat-value text-error">{{ today }}</div> 
      <!-- <div class="stat-desc text-error">↘︎ 90 (14%)</div> -->
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
      all: '',
      today: '',
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
    const PATH_API2 = '/covid'
    axios.get(`/api/v2${PATH_API2}`).then(res => {
      const internationalNumberFormat = new Intl.NumberFormat('en-US')
      const data = res.data
      this.all = data.decideCnt
      this.today = data.todayCnt
      this.all = internationalNumberFormat.format(this.all)
      this.today = internationalNumberFormat.format(this.today)
    })
  },
}
</script>