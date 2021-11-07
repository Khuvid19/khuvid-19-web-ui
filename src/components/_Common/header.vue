<template>
  <div>
    <div class="page-header">
      <div class="header-logo">KHUVID(로고)</div>
      <div class="header-user btn btn-xs btn-primary" @click="clickLogin">
        {{ $auth.loggedIn ? 'LogOut' : 'LogIn' }}
      </div>
    </div>
    <FullScreen
      v-model="showLoginScreen"
      title="로그인"
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
      if (this.$auth.loggedIn) {
        this.$auth.logout()
        return
      }
      this.$auth.loginWith('google', { params: { prompt: 'select_account' } })
    },
  },
}
</script>

<style>
</style>
