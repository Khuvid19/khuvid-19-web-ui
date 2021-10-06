<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/_Common/header'
import Footer from '@/components/_Common/footer'
export default {
  components: { Footer, Header },
}
</script>

<style>
</style>