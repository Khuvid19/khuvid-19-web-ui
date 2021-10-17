<template>
  <div class="page-status">
    <div class="flex flex-col w-full">
      <div class="dashboard-logo">상황판</div>
      <div class="grid h-20 card bg-base-300 rounded-box place-items-center">확진자</div> 
      <div class="divider"></div>
      <div class="grid h-20 card bg-base-300 rounded-box place-items-center">
        <div class="flex flex-row w-full">
          <div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">1차 접종</div> 
          <div class="divline divider divider-vertical"></div> 
          <div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">접종 완료</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


export default {
  data() {
    return {
      confirmed: '',
      first: '',
      second: '',
    }
  },

  created () {
    axios.get('https://nip.kdca.go.kr/irgd/cov19stats.do?list=all').then(res => {
      console.log(res);
    })
  },
}
</script>