<template>
  <div class="overflow-y-scroll">
    <dashboard />
    <div class="w-full mt-60 bg-gray-200" />
    <dashboard-chart class="-mt-56 mb-2" />
  </div>
</template>

<script>
import Dashboard from '@/components/Main/dashboard';
import DashboardChart from '@/components/Main/dashboardChart';

export default {
  components: {
    Dashboard,
    DashboardChart,
  },
  head () {
    return {
      title: 'KHUVID MAIN',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'KHUVID-19는 코로나 19 백신 접종 후기 플랫폼입니다. 확진자 수, 접종자 수, 부작용에 대한 통계를 그래프로 확인할 수 있습니다.',
        },
      ],
    };
  },
};
</script>
