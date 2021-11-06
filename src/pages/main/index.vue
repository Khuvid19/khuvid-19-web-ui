<template>
  <div>
    <Dashboard />
    <test-chart />
  </div>
</template>

<script>
import Dashboard from '@/components/Main/dashboard'
import TestChart from "@/components/Main/dashboardChart";

export default {
  components: { Dashboard, TestChart },
  created(){
    console.log(this.$route)
  },
  mounted() {
    if(this.$route.hash !== '') window.location.replace('/main')

  },
}
</script>
