<template>
  <div class="rounded-lg shadow bg-base-200 drawer drawer-end h-screen">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div class="flex flex-col items-center justify-center drawer-content">
      <Header />
      <Nuxt class="page-body overflow-y-hidden" />
      <Footer />
      <SignUp />
    </div>
    <div class="drawer-side">
      <label for="my-drawer-4" class="drawer-overlay">이름</label>
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <li>
          <a>내 정보</a>
        </li>
        <li>
          <a>작성 후기</a>
        </li>
        <li>
          <a>내가 쓴 글</a>
        </li>
        <li>
          <a @click="clickLogout">로그아웃</a>
        </li>
      </ul>
    </div>
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
  methods: {
    clickLogout() {
      this.$auth.logout()
      this.$router.go()
    },
  },
}
</script>

<style>
</style>
