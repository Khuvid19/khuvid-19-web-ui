<template>
  <div class="rounded-lg shadow bg-gray-100 drawer drawer-end h-screen">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle">
    <div class="flex flex-col items-center justify-center drawer-content">
      <Header />
      <Nuxt class="page-body overflow-y-hidden w-full" />
      <Footer class="page-footer" />
      <SignUp ref="signUpScreen" />
    </div>
    <DrawerSide />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import SignUp from '../components/SignUp/signUp';
import Header from '@/components/_Common/header';
import Footer from '@/components/_Common/footer';
import DrawerSide from '@/components/Drawer/drawerSide';
export default {
  components: { Footer, Header, SignUp, DrawerSide },
  async created () {
    if (this.$route.hash !== '') {
      this.$router.replace('/main');
    }
    if (this.$auth.loggedIn === true) {
      const accessToken = this.$auth.strategy.token.get().split(' ')[1];

      const loginRes = (
        await this.$axios.post('auth/google', {
          access_token: accessToken,
        })
      ).data;

      if (loginRes === '') {
        this.$refs.signUpScreen.screenFlag = true;
      } else {
        this.setUser(loginRes);
        this.$refs.signUpScreen.screenFlag = false;
      }
    }
  },
  methods: {
    ...mapActions({
      setUser: 'setUser',
    }),
  },
};
</script>

<style>
</style>
