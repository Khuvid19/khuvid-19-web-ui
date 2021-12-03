<template>
  <div class="drawer-side">
    <label for="my-drawer-4" class="drawer-overlay"></label>
    <ul
      class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content pt-14"
    >
      <div class="flex align-middle pl-4 mb-12">
        <div class="avatar self-center mr-4">
          <div class="rounded-full w-20 h-20 self-center">
            <img class="self-center" :src="user ? user.picUrl : ''" />
          </div>
        </div>
        <div class="self-center">
          <div class="text-lg font-bold">{{ user ? user.nickName : '' }}</div>
          <div class="text-sm">
            {{ user ? user.email : '' }}
          </div>
        </div>
      </div>
      <li class="mb-2">
        <a @click="clickMenu('myInfo')">
          <fa-icon class="text-2xl mr-6" :icon="['fas', 'user']" />
          내 정보
        </a>
      </li>
      <li class="mb-2">
        <a @click="clickMenu('myReview')">
          <fa-icon class="text-2xl mr-5" :icon="['fas', 'edit']" />
          내가 쓴 후기
        </a>
      </li>
      <li>
        <a @click="clickMenu('myPost')">
          <fa-icon class="text-2xl mr-7" :icon="['fas', 'file-alt']" />
          내가 쓴 글
        </a>
      </li>
      <li class="bottom-5 absolute">
        <a @click="clickLogout"
          ><fa-icon
            class="text-2xl mr-6"
            :icon="['fas', 'sign-out-alt']"
          />로그아웃</a
        >
      </li>
    </ul>
    <sign-up ref="myInfoScreen" mode="myInfo" />
    <my-review-screen ref="myReviewScreen" />
    <my-post-screen ref="myPostScreen" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SignUp from '../SignUp/signUp'
import MyPostScreen from './myPostScreen'
import MyReviewScreen from './myReviewScreen'

export default {
  components: { MyReviewScreen, MyPostScreen, SignUp },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  created() {
    console.log('this.user', this.user)
  },
  methods: {
    clickLogout() {
      this.$auth.logout()
      this.$router.go()
    },
    clickMenu(menu) {
      switch (menu) {
        case 'myInfo':
          console.log('1234')
          this.$refs.myInfoScreen.screenFlag = true
          break
        case 'myReview':
          this.$refs.myReviewScreen.screenFlag = true
          break
        case 'myPost':
          this.$refs.myPostScreen.screenFlag = true
          break
        default:
          break
      }
    },
  },
}
</script>

<style>
</style>
