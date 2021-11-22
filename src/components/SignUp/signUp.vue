<template>
  <FullScreen
    v-model="signupScreenFlag"
    title="회원가입"
    ok-text="완료"
    @onClickBack="onClickSignupBack"
    @onClickOk="onClickSignupSubmit"
  >
    <div class="p-8">
      <div class="avatar flex justify-center">
        <div class="mb-12 rounded-full w-20 h-20">
          <img :src="profileImgSrl" />
        </div>
      </div>
      <div class="text-xl flex items-center justify-between mb-12">
        이메일<input
          v-model="email"
          :disabled="true"
          class="input input-disabled w-64"
        />
      </div>
      <div class="text-xl flex items-center justify-between mb-12">
        성별
        <div class="btn-group w-64">
          <input
            v-for="gender in genderList"
            :key="gender.code"
            v-model="genderValue"
            :value="gender.code"
            type="radio"
            :data-title="gender.value"
            class="btn bg-white w-32 text-gray-400 border-gray-400"
          />
        </div>
      </div>
      <div class="text-xl flex items-center justify-between mb-12">
        나이
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
          <input
            v-model="nickname"
            class="input border-gray-400 bg-white w-40"
            @input="nicknameInputChange($event)"
          />
          <label
            class="btn btn-primary modal-button"
            :disabled="isEmptyNickname"
            @click="checkNicknameDuplicate"
            >중복 확인</label
          >
        </div>
      </div>
    </div>
    <input id="modal" ref="modal" type="checkbox" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <p>{{ msgModal }}</p>
        <div class="modal-action">
          <label for="modal" class="btn">확인</label>
        </div>
      </div>
    </div>
  </FullScreen>
</template>

<script>
import { mapActions } from 'vuex'
import FullScreen from '@/components/_Common/fullScreen'

export default {
  name: 'SignUp',
  components: {
    FullScreen,
  },
  data() {
    return {
      genderValue: '',
      signupScreenFlag: false,
      ageList: ['1234'], // 임시방편
      ageListIdx: 0,
      genderList: [],
      genderListIdx: 0,
      msgModal: '',
      passDuplicate: false,
      isEmptyNickname: true,
      nickname: '',
      email: '',
      profileImgSrl: '',
    }
  },
  async fetch() {
    const ageTypeRes = (await this.$axios.get('auth/types/age')).data
    this.ageList = ageTypeRes

    const genderTypeRes = (await this.$axios.get('auth/types/gender')).data
    this.genderList = genderTypeRes
    this.genderValue = this.genderList[0].code
  },
  computed: {
    ageValue() {
      return this.ageList[this.ageListIdx].value
    },
  },
  watch: {
    signupScreenFlag: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.email = this.$auth.$state.user.email
          this.profileImgSrl = this.$auth.$state.user.picture
        }
      },
    },
  },
  created() {},
  methods: {
    ...mapActions({
      setUser: 'setUser',
    }),
    nicknameInputChange(event) {
      const nickname = event.target.value.trim()

      if (nickname === '') this.isEmptyNickname = true
      else this.isEmptyNickname = false

      this.passDuplicate = false
    },
    checkNicknameDuplicate() {
      if (this.nickName === '') {
        this.msgModal = '닉네임을 입력해주세요.'
        this.passDuplicate = false

        this.$refs.modal.click()
        return
      }

      this.$axios
        .get('auth/user', {
          params: {
            nickName: this.nickname,
          },
        })
        .then((res) => {
          if (res.data) {
            this.msgModal = '이미 존재하는 닉네임입니다.'
            this.passDuplicate = false
          } else {
            this.msgModal = '사용 가능한 닉네임입니다.'
            this.passDuplicate = true
          }
          this.$refs.modal.click()
        })
    },
    onClickSignupBack() {
      this.signupScreenFlag = false
      this.$auth.logout()
    },
    onClickSignupSubmit() {
      if (this.passDuplicate) {
        const signUpParams = {
          age: this.ageList[this.ageListIdx].code,
          email: this.email,
          gender: this.genderValue,
          name: this.$auth.$state.user.name,
          nickName: this.nickname,
          picUrl: this.profileImgSrl,
        }

        console.log('signUpParams', signUpParams)

        this.$axios
          .post('auth/user', {
            ...signUpParams,
          })
          .then((r) => {
            localStorage.setItem('jwtToken', r.data.jwtToken)
          })

        this.signupScreenFlag = false
      } else {
        this.msgModal = '닉네임 중복확인을 해주세요.'
        this.$refs.modal.click()
      }
    },
  },
}
</script>

<style>
</style>