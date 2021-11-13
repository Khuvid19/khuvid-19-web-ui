<template>
  <FullScreen
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
          <button
            class="btn text-xl btn-primary"
            @click="
              ageListIdx =
                ageListIdx === 0 ? ageList.length - 1 : ageListIdx - 1
            "
          >
            <fa-icon :icon="['fas', 'caret-left']"></fa-icon>
          </button>
          <button class="btn btn-outline btn-primary w-32 btn-disabled">
            {{ ageValue }}
          </button>
          <button
            class="btn text-xl btn-primary"
            @click="ageListIdx = (ageListIdx + 1) % ageList.length"
          >
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
  </FullScreen>
</template>

<script>
import FullScreen from '@/components/_Common/fullScreen'

export default {
  name: 'SignUp',
  components: {
    FullScreen,
  },
  data() {
    return {
      signupScreenFlag: false,
      ageList: [
        '10대이하',
        '20대',
        '30대',
        '40대',
        '50대',
        '60대',
        '70대 이상',
      ],
      ageListIdx: 0,
    }
  },
  computed: {
    ageValue() {
      return this.ageList[this.ageListIdx]
    },
  },
  created() {
    if (this.$auth.$state.loggedIn) {
      this.signupScreenFlag = true
    }
  },
  methods: {
    onClickSignupBack() {
      this.signupScreenFlag = false
    },
  },
}
</script>

<style>
</style>