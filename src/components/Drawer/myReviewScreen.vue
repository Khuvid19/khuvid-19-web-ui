<template>
  <full-screen
    v-model="screenFlag"
    title="작성 후기"
    @onClickBack="onClickBack"
  >
  </full-screen>
</template>

<script>
import fullScreen from '../_Common/fullScreen'
export default {
  components: { fullScreen },
  data() {
    return { screenFlag: false }
  },
  methods: {
    onClickBack() {
      this.screenFlag = false
    },
  },
}
</script>

<style>
</style>