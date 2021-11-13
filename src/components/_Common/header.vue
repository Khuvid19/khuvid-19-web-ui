<template>
  <div>
    <div
      class="
        flex
        align-middle
        justify-between
        bg-white
        pl-6
        pr-6
        h-16
        shadow-sm
      "
    >
      <div class="self-center">KHUVID(로고)</div>
      <div
        v-if="$auth.loggedIn === false"
        class="btn btn-xs btn-primary self-center"
        @click="clickLogin"
      >
        LogIn
      </div>
      <div v-else class="avatar self-center">
        <div class="rounded-full w-10 h-10 self-center">
          <img
            class="self-center"
            :src="$auth.$state.user ? $auth.$state.user.picture : ''"
            @click="$auth.logout()"
          />
        </div>
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
