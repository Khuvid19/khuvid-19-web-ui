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
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'KHUVID-19는 코로나 19 백신 접종 후기 플랫폼입니다. Main 페이지는 확진자 수와 접종자 수 그리고 부작용에 대한 통계를 그래프로 확인할 수 있습니다.',
        },
      ],
    };
  },
};
</script>
