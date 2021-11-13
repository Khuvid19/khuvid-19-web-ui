<template>
  <div>
    <Header />
    <Nuxt class="page-body overflow-y-hidden" />
    <Footer />
    <SignUp />
  </div>
</template>

<script>
import SignUp from '../components/SignUp/signUp'
import Header from '@/components/_Common/header'
import Footer from '@/components/_Common/footer'
export default {
  components: { Footer, Header, SignUp },
  created() {
    if (this.$route.hash !== '') this.$router.replace('/main')
  },
}
</script>

<style>
</style>
