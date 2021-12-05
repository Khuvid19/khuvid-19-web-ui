<template>
  <div>
    <div
      class="
        flex
        align-middle
        justify-between
        bg-white
        pl-4
        pr-4
        h-16
        shadow-sm
        fixed
        top-0
        left-0
        w-full
      "
    >
      <div class="self-center text-4xl font-bold text-primary">
        KHUVID
      </div>
      <div
        v-if="$auth.loggedIn === false"
        class="btn btn-xs btn-primary self-center"
        @click="clickLogin"
      >
        LogIn
      </div>
      <label v-else for="my-drawer-4" class="avatar self-center">
        <div class="rounded-full w-10 h-10 self-center">
          <img
            class="self-center"
            :src="$auth.$state.user ? $auth.$state.user.picture : ''"
          >
        </div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickLogin () {
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
