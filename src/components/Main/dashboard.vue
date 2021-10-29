<template>
  <div class="page-status">
    <div class="flex flex-col w-full">
      <div class="dashboard-logo">상황판</div>
      <div class="grid h-20 card bg-base-300 rounded-box place-items-center">확진자</div> 
      <div class="divline"></div>
      <div class="grid h-20 card bg-base-300 rounded-box place-items-center">
        <div class="flex flex-row w-full">
          <div class="inoculator-area grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
            1차 접종<br>{{ first }}
          </div> 
          <div class="hidden divider divider-vertical"></div> 
          <div class="inoculator-area grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
            2차 접종<br>{{ second }}
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
      confirmed: '',
      first: '',
      second: '',
    }
  },

  created () {
    const PATH_API = '/irgd/cov19stats.do?list=all'
    axios.get(`/api/v1${PATH_API}`).then(res => {
      const xml = res.data
      const json = JSON.parse(convert.xml2json(xml, { compact: true }))
      this.first = json.response.body.items.item[2].firstCnt._text
      this.second = json.response.body.items.item[2].secondCnt._text
    })
  },
}
</script>