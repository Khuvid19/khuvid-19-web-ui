<template>
  <div>
    <Header />
    <Nuxt class="page-body overflow-y-hidden" />
    <Footer />
    <SignUp />
    <!-- <FullScreen
      v-model="signupScreenFlag"
      title="회원가입"
      ok-text="완료"
      @onClickBack="onClickSignupBack"
    >
      <div class="p-8">
        <div class="avatar flex justify-center">
          <div class="mb-8 rounded-full w-20 h-20">
            <img :src="$auth.$state.user ? $auth.$state.user.picture : ''" />
          </div>
        </div>
        <div class="text-xl flex items-center justify-between mb-10">
          이메일<input
            :disabled="true"
            class="input input-disabled w-64"
            :value="$auth.$state.user ? $auth.$state.user.email : ''"
          />
        </div>
        <div class="text-xl flex items-center justify-between mb-10">
          성별
          <div class="btn-group w-64">
            <input
              id="option1"
              type="radio"
              name="options"
              data-title="남자"
              class="btn bg-white w-32 text-gray-400 border-gray-400"
            />
            <input
              id="option2"
              type="radio"
              name="options"
              data-title="여자"
              class="btn bg-white w-32 text-gray-400 border-gray-400"
            />
          </div>
        </div>
        <div class="text-xl flex items-center justify-between mb-10">
          생년월일
          <div class="flex justify-between w-64">
            <button class="btn text-xl btn-primary">
              <fa-icon :icon="['fas', 'caret-left']"></fa-icon>
            </button>
            <button class="btn btn-outline btn-primary w-32 btn-disabled">
              20대
            </button>
            <button class="btn text-xl btn-primary">
              <fa-icon :icon="['fas', 'caret-right']"></fa-icon>
            </button>
          </div>
        </div>
        <div class="text-xl flex items-center justify-between">
          닉네임
          <div class="w-64 flex justify-between align-middle">
            <input class="input border-gray-400 bg-white w-40" />
            <button class="btn btn-primary">중복확인</button>
          </div>
        </div>
      </div>
    </FullScreen> -->
  </div>
</template>

<script>
import SignUp from '../components/SignUp/signUp'
import Header from '@/components/_Common/header'
import Footer from '@/components/_Common/footer'
export default {
  components: { Footer, Header, SignUp },
  data() {},
  created() {
    if (this.$route.hash !== '') this.$router.replace('/main')
  },
}
</script>

<style>
</style>
