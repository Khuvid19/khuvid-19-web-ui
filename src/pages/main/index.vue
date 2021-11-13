<template>
  <div>
    <Dashboard />
    <div class="w-full mt-60 bg-gray-200"></div>
    <Chart class="mt-1" />
  </div>
</template>

<script>
import Dashboard from '@/components/Main/dashboard'
import Chart from "@/components/Main/dashboardChart";

export default {
  components: { Dashboard, Chart },
}
</script>
