<template>
  <div class="drawer-side">
    <label for="my-drawer-4" class="drawer-overlay" />
    <ul
      class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content pt-14 bg-dark-200"
    >
      <div class="flex align-middle pl-4 mb-12">
        <div class="avatar self-center mr-4">
          <div class="rounded-full w-20 h-20 self-center">
            <img
              class="self-center"
              :src="user ? user.picUrl : ''"
              alt="user"
            >
          </div>
        </div>
        <div class="self-center">
          <div class="text-lg font-bold">
            {{ user ? user.nickName : '' }}
          </div>
          <div class="text-sm">
            {{ user ? user.email : '' }}
          </div>
        </div>
      </div>
      <li class="mb-2">
        <div class="flex hoverGray px-4 py-2" @click="clickMenu('myInfo')">
          <fa-icon style="font-size: 20px; width: 15px" class="text-2xl mr-6" :icon="['fas', 'user']" />
          내 정보
        </div>
      </li>
      <li class="mb-2">
        <div class="flex hoverGray px-4 py-2" @click="clickMenu('myReview')">
          <fa-icon style="font-size: 20px; width: 15px" class="text-2xl mr-6" :icon="['fas', 'edit']" />
          내가 쓴 후기
        </div>
      </li>
      <li>
        <div class="flex hoverGray px-4 py-2" @click="clickMenu('myPost')">
          <fa-icon style="font-size: 20px; width: 15px" class="text-2xl mr-6" :icon="['fas', 'file-alt']" />
          내가 쓴 글
        </div>
      </li>
      <li class="bottom-5 absolute w-80 pr-8">
        <div
          class="flex hoverGray px-4 py-2"
          @click="clickLogout"
        >
          <fa-icon
            class="text-2xl mr-6"
            style="font-size: 20px; width: 15px"
            :icon="['fas', 'sign-out-alt']"
          />
          로그아웃</div>
      </li>
    </ul>
    <sign-up ref="myInfoScreen" mode="myInfo" />
    <my-review-screen ref="myReviewScreen" />
    <my-post-screen ref="myPostScreen" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SignUp from '../SignUp/signUp';
import MyPostScreen from './myPostScreen';
import MyReviewScreen from './myReviewScreen';

export default {
  components: {
    MyReviewScreen,
    MyPostScreen,
    SignUp,
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  created () {
    // console.log('this.user', this.user);
  },
  methods: {
    clickLogout () {
      this.$auth.logout();
      this.$router.go();
    },
    clickMenu (menu) {
      switch (menu) {
        case 'myInfo':
          this.$refs.myInfoScreen.screenFlag = true;
          break;
        case 'myReview':
          this.$refs.myReviewScreen.screenFlag = true;
          break;
        case 'myPost':
          this.$refs.myPostScreen.screenFlag = true;
          break;
        default:
          break;
      }
    },
  },
};
</script>
