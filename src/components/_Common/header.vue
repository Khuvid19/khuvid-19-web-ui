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
      <client-only>
        <div
          class="text-xs self-center -mr-28"
          @click="changemode"
        >
          <fa-icon v-if="!darkFlag" class="text-3xl self-center toggle-icon" icon="sun" />
          <fa-icon v-if="darkFlag" class="text-3xl self-center toggle-icon" icon="moon" />
        </div>
      </client-only>
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
  data () {
    return {
      darkFlag: false,
      toggleIcon: 'sun',
    };
  },
  created () {
    this.storeMode();
  },
  methods: {
    storeMode () {
      if (typeof window !== 'undefined') {
        if (localStorage.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        this.darkFlag = document.documentElement.classList.contains('dark');
        // 👉️ can use localStorage here
      } else {
        // 👉️ can't use localStorage
      }
    },
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
      this.darkFlag = document.documentElement.classList.contains('dark');
      const theme = this.darkFlag ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      const item = this.$root.$refs.dashboardChart.current;
      this.$root.$refs.dashboardChart.changeChart(item);
    },
  },
};
</script>

<style>
</style>
