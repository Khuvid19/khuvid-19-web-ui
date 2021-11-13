<template>
  <div class="rounded-lg shadow bg-base-200 drawer drawer-end h-screen">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div class="flex flex-col items-center justify-center drawer-content">
      <Header />
      <Nuxt class="page-body overflow-y-hidden" />
      <Footer />
      <SignUp />
    </div>
    <DrawerSide />
  </div>
</template>

<script>
import SignUp from '../components/SignUp/signUp'
import Header from '@/components/_Common/header'
import Footer from '@/components/_Common/footer'
import DrawerSide from '@/components/_Common/drawerSide'
export default {
  components: { Footer, Header, SignUp, DrawerSide },
  created() {
    if (this.$route.hash !== '') this.$router.replace('/main')
  },
  methods: {},
}
</script>

<style>
</style>
