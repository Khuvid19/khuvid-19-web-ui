<template>
  <FullScreen
    v-model="myInfoScreenFlag"
    title="내 정보"
    @onClickBack="onClickBack"
  >
    1234
  </FullScreen>
</template>

<script>
import FullScreen from '../_Common/fullScreen'
export default {
  components: { FullScreen },
  data() {
    return {
      myInfoScreenFlag: false,
    }
  },
  methods: {
    onClickBack() {
      this.myInfoScreenFlag = false
    },
  },
}
</script>

<style>
</style>