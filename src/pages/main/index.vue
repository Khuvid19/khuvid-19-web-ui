<template>
  <div>
    <TestComponent />
    <button class="btn btn-primary">버튼</button>
      <test-chart />
  </div>
</template>

<script>
import TestComponent from '@/components/Main/test'
import TestChart from "@/components/Main/dashboardChart";

export default {
  components: {TestChart, TestComponent },
}
</script>
