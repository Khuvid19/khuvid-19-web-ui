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
        page-header
      "
    >
      <div
        class="self-center text-4xl font-bold text-primary"
        @click="clickLogo"
      >
        KHUVID
      </div>
      <div
        id="toggleBtn"
        class="btn btn-sm text-xs self-center -mr-24 toggle-btn"
        @click="changemode"
      >
        dark
      </div>
      <div
        v-if="$auth.loggedIn === false"
        class="btn btn-sm text-xs btn-primary self-center"
        @click="clickLogin"
      >
        LogIn
      </div>
      <label v-else for="my-drawer-4" class="avatar self-center">
        <div class="rounded-full w-10 h-10 self-center">
          <img
            class="self-center"
            :src="$auth.$state.user ? $auth.$state.user.picture : ''"
            alt="user"
          >
        </div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickLogo () {
      this.$router.push('/main');
    },
    clickLogin () {
      if (this.$auth.loggedIn) {
        this.$auth.logout();
        return;
      }
      this.$auth.loginWith('google', { params: { prompt: 'select_account' } });
    },
    changemode () {
      document.documentElement.classList.toggle('dark');
      const toggleBtn = document.getElementById('toggleBtn');
      toggleBtn.innerHTML =
        toggleBtn.innerHTML === 'light'
          ? (toggleBtn.innerHTML = 'dark')
          : (toggleBtn.innerHTML = 'light');
    },
  },
};
</script>
