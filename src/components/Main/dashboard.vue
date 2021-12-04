<template>
  <div class="page-status mt-2 flex flex-col w-full">
    <div class="w-full flex shadow stats">
      <div class="bg-white stat place-items-center place-content-center">
        <div class="stat-title">누적 확진자</div>
        <div class="stat-value text-success">{{ todayAll }}</div>
        <div class="stat-desc text-success text-sm">↗︎ {{ today }} ({{ decideDoD }})%</div>
      </div>
      <div class="bg-white stat place-items-center place-content-center">
        <div class="stat-title">신규 확진자</div>
        <div class="stat-value text-error">{{ today }}</div>
        <div class="stat-desc text-error text-sm">{{ todayDoD }}</div>
      </div>
    </div>

    <carousel 
    :perPage=1
    :pagination-active-color="'#9ed0d3'"
    :pagination-padding=7
    :autoplay=true
    class="mt-3 rounded-2xl shadow w-full place-items-center">
      <slide id="item1" class="bg-white rounded-2xl stat">
        <div class="ml-2 stat-title">전국 1차 접종</div>
        <div class="ml-2 stat-value text-primary">{{ firstPercent }}%</div>
        <div class="hidden"></div>
        <div class="-mt-1 mr-4 text-sm gray text-neutral flex-grow">
          누적 {{ first }} <br>
          신규 {{ todayFirst }} ↗︎
        </div>
      </slide> 
      <slide id="item2" class="bg-white rounded-2xl stat">
        <div class="ml-2 stat-title">전국 2차 접종</div>
        <div class="ml-2 stat-value text-primary">{{ secondPercent }}%</div>
        <div class="hidden"></div> 
        <div class="-mt-1 mr-4 text-sm gray grid flex-grow place-items-center">
          누적 {{ second }} <br>
          신규 {{ todaySecond }} ↗︎
        </div>
      </slide>
      <slide id="item3" class="bg-white rounded-2xl stat">
        <div class="ml-2 stat-title">전국 3차 접종</div>
        <div class="ml-2 stat-value text-primary">{{ thirdPercent }}%</div>
        <div class="hidden"></div>
        <div class="-mt-1 mr-4 text-sm gray grid flex-grow place-items-center">
          누적 {{ third }} <br>
          신규 {{ todayThird }} ↗︎
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import axios from 'axios'
import { Carousel, Slide } from 'vue-carousel'
const convert = require('xml-js')

export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      todayAll: '',
      today: '',
      yesterday: '',
      yesterdayAll: '',
      decideDoD: '',
      todayDoD: '',
      first: '',
      second: '',
      third: '',
      todayFirst: '',
      todaySecond: '',
      todayThird: '',
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
      this.firstPercent = (this.first / 51667688 * 100).toFixed(1)
      this.secondPercent = (this.second / 51667688 * 100).toFixed(1)
      this.thirdPercent = (this.third / 51667688 * 100).toFixed(1)
      this.first = internationalNumberFormat.format(this.first)
      this.second = internationalNumberFormat.format(this.second)
      this.third = internationalNumberFormat.format(this.third)
      this.todayFirst = json.response.body.items.item[0].firstCnt._text
      this.todaySecond = json.response.body.items.item[0].secondCnt._text
      this.todayThird = json.response.body.items.item[0].thirdCnt._text
      this.todayFirst = internationalNumberFormat.format(this.todayFirst)
      this.todaySecond = internationalNumberFormat.format(this.todaySecond)
      this.todayThird = internationalNumberFormat.format(this.todayThird)
    })
    const PATH_API2 = '/covid'
    axios.get(`/api/v2${PATH_API2}`).then(res => {
      const internationalNumberFormat = new Intl.NumberFormat('en-US')
      const data = res.data
      this.todayAll = data[0].decideCnt
      this.today = data[0].todayCnt
      this.yesterday = data[1].todayCnt
      this.yesterdayAll = data[1].decideCnt
      this.decideDoD = ((this.todayAll - this.yesterdayAll) / this.yesterdayAll * 100).toFixed(1)
      const figure = ((this.today - this.yesterday) / this.yesterday * 100).toFixed(1)
      if (figure < 0) {
        this.todayDoD = `↘︎ ${-(this.today - this.yesterday)} (${-figure})%`
      } else if (figure === 0) {
        this.todayDoD = `- 0 (0)%`
      } else {
        this.todayDoD = `↗︎ ${this.today - this.yesterday} (${figure})%`
      }
      this.todayAll = internationalNumberFormat.format(this.todayAll)
      this.today = internationalNumberFormat.format(this.today)
    })
  },
}
</script>