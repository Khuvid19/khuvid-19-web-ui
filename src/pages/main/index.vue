<template>
  <div class="overflow-y-scroll">
    <Dashboard />
    <div class="w-full mt-60 bg-gray-200" />
    <Chart class="-mt-56 mb-2" />
  </div>
</template>

<script>
import Dashboard from '@/components/Main/dashboard';
import Chart from '@/components/Main/dashboardChart';

export default {
  components: {
    Dashboard,
    Chart,
  },
  head () {
    return {
      title: 'KHUVID MAIN',
    };
  },
};
</script>
