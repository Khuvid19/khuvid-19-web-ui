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
  middleware: ['auth'],
  data() {
    return {
      showLoginScreen: false,
    }
  },
  created() {
    console.log(this.$auth)
  },
  methods: {
    clickLogin() {
      if (this.$auth.loggedIn) {
        this.$auth.logout()
      } else {
        this.$auth.loginWith('google')
      }
      // this.showLoginScreen = true
      // console.log('clickLogin')
      // console.log(this.$auth)
      // console.log('this.$auth.loginWith', this.$auth.loginWith)
    },
  },
}
</script>

<style>
</style>