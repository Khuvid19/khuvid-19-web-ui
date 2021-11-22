<template>
  <full-screen
    v-model="screenFlag"
    title="내가 쓴 글"
    @onClickBack="onClickBack"
  ></full-screen>
</template>

<script>
import FullScreen from '../_Common/fullScreen'
export default {
  components: {
    FullScreen,
  },
  data() {
    return {
      screenFlag: false,
    }
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