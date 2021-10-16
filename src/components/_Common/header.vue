<template>
  <div>
    <div class="page-header">
      <div class="header-logo">KHUVID(로고)</div>
      <div class="header-user btn btn-xs btn-primary" @click="clickLogin">
        LogIn
      </div>
    </div>
    <FullScreen
      v-model="showLoginScreen"
      title="로그인"
      ok-text="완료"
      @onClickBack="(val) => (showLoginScreen = val)"
    >
      로그인 내용
    </FullScreen>
  </div>
</template>

<script>
import FullScreen from './fullScreen'
export default {
  components: { FullScreen },
  data() {
    return {
      showLoginScreen: false,
    }
  },
  methods: {
    clickLogin() {
      this.showLoginScreen = true
      console.log('clickLogin')
    },
  },
}
</script>

<style>
</style>