<template>
  <FullScreen
    v-model="screenFlag"
    :title="mode === 'signUp' ? '회원가입' : '내 정보'"
    :ok-text="mode === 'signUp' ? '완료' : '수정'"
    class="bg-dark bg-SignUp"
    @onClickBack="onClickSignupBack"
    @onClickOk="onClickSignupSubmit"
  >
    <div class="p-8 bg-dark">
      <div class="avatar flex justify-center">
        <div class="mb-12 rounded-full w-20 h-20">
          <img
            :src="profileImgSrl"
            alt="user"
          >
        </div>
      </div>
      <div class="text-xl flex items-center justify-between mb-12">
        이메일<input
          v-model="email"
          :disabled="true"
          class="input input-disabled w-64 bg-dark-200"
        >
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
            class="btn bg-white w-32 text-gray-400 border-gray-400 bg-dark-200"
          >
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
            <fa-icon
              :icon="['fas', 'caret-left']"
              style="width: 10px"
            />
          </button>
          <div
            style="border-width: 1px"
            class="
              flex
              w-32
              text-sm
              border-primary
              bg-white
              rounded-full
              align-middle
              justify-center
              h-12
              bg-dark-200
            "
          >
            <div class="m-auto ">
              {{ ageValue }}
            </div>
          </div>
          <!-- <button
            class="btn btn-outline hover:bg-white btn-primary w-32"
          ></button> -->
          <button
            class="btn text-xl btn-primary"
            @click="ageListIdx = (ageListIdx + 1) % ageList.length"
          >
            <fa-icon style="width: 10px" :icon="['fas', 'caret-right']" />
          </button>
        </div>
      </div>
      <div class="text-xl flex items-center justify-between">
        닉네임
        <div class="w-64 flex justify-between align-middle">
          <input
            v-model="nickname"
            class="input border-gray-400 bg-white w-40 bg-dark-200"
            @input="nicknameInputChange($event)"
          >
          <label
            class="btn btn-primary modal-button"
            :disabled="
              isEmptyNickname ||
                (mode === 'myInfo' && getUser.nickName === nickname)
            "
            @click="checkNicknameDuplicate"
          >중복 확인</label>
        </div>
      </div>
    </div>
    <middle-modal
      :check-flag="middleModalFlag"
      :text="msgModal"
      ok-text="확인"
      @clickOk="clickModalOk"
    />
  </FullScreen>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import FullScreen from '@/components/_Common/fullScreen';
import MiddleModal from '@/components/_Common/middleModal';
export default {
  name: 'SignUp',
  components: {
    FullScreen,
    MiddleModal,
  },
  props: {
    mode: {
      default: 'signUp',
      type: String,
    },
  },
  data () {
    return {
      middleModalFlag: false,
      genderValue: '',
      screenFlag: false,
      ageList: ['123'], // 임시방편
      ageListIdx: 0,
      genderList: [],
      msgModal: '',
      passDuplicate: false,
      isEmptyNickname: true,
      email: '',
      profileImgSrl: '',
      nickname: '',
      modalId: null,
    };
  },
  computed: {
    ...mapGetters({
      getUser: 'getUser',
      getAgeList: 'User/getAgeType/getListContents',
      getGenderList: 'User/getGenderType/getListContents',
    }),
    ageValue () {
      return this.ageList[this.ageListIdx].value;
    },
  },
  watch: {
    screenFlag: {
      handler (newVal) {
        if (newVal) {
          this.ageList = this.getAgeList;
          this.genderList = this.getGenderList;
          this.email = this.$auth.$state.user.email;
          this.profileImgSrl = this.$auth.$state.user.picture;

          if (this.mode === 'signUp') {
            this.modalId = 'signUpModal';
            this.ageListIdx = 0;
            this.genderValue = this.genderList[0].code;
          } else if (this.mode === 'myInfo') {
            this.modalId = 'myInfoModal';
            this.nickname = this.getUser?.nickName;
            this.genderValue = this.getUser.gender;

            for (let i = 0; i < this.ageList.length; i++) {
              if (this.ageList[i].code === this.getUser.age) {
                this.ageListIdx = i;
              }
            }
          }
        }
      },
    },
  },
  methods: {
    ...mapActions({
      setUser: 'setUser',
    }),
    nicknameInputChange (event) {
      const nickname = event.target.value.trim();

      if (nickname === '') {
        this.isEmptyNickname = true;
      } else {
        this.isEmptyNickname = false;
      }

      this.passDuplicate = false;
    },
    checkNicknameDuplicate () {
      const regExp = /^[a-zA-Zㄱ-힣0-9]*$/; // 닉네임 정규식
      const lengthRegExp = /^.{2,8}$/; // 닉네임 정규식

      if (!regExp.test(this.nickname)) {
        this.msgModal =
          '닉네임은 한글, 영문, 숫자만 가능하며 공백 및 특수문자는 불가능합니다.';
        this.passDuplicate = false;

        this.middleModalFlag = true;
        return;
      } else if (!lengthRegExp.test(this.nickname)) {
        this.msgModal = '닉네임은 2-8자리만 가능합니다.';
        this.passDuplicate = false;

        this.middleModalFlag = true;
        return;
      }

      axios
        .get('/api/v2/auth/user', {
          params: {
            nickName: this.nickname,
          },
        })
        .then((res) => {
          if (res.data) {
            this.msgModal = '이미 존재하는 닉네임입니다.';
            this.passDuplicate = false;
          } else {
            this.msgModal = '사용 가능한 닉네임입니다.';
            this.passDuplicate = true;
          }
          this.middleModalFlag = true;
        });
    },
    onClickSignupBack () {
      if (this.mode === 'signUp') {
        this.$auth.logout();
      }
      this.screenFlag = false;
    },
    onClickSignupSubmit () {
      if (
        this.mode === 'signUp'
          ? this.passDuplicate
          : this.nickname === this.getUser.nickName || this.passDuplicate
      ) {
        if (this.mode === 'signUp') {
          const params = {
            age: this.ageList[this.ageListIdx].code,
            email: this.email,
            gender: this.genderValue,
            name: this.$auth.$state.user.name,
            nickName: this.nickname,
            picUrl: this.profileImgSrl,
          };
          this.$axios
            .post('auth/user', {
              ...params,
            })
            .then((r) => {
              this.setUser(r.data);
            })
            .finally(() => {
              this.screenFlag = false;
            });
        } else if (this.mode === 'myInfo') {
          const params = {
            age: this.ageList[this.ageListIdx].code,
            gender: this.genderValue,
            nickName: this.nickname,
          };

          this.$axios
            .put('auth', {
              ...params,
            })
            .then((r) => {
              this.setUser(r.data);
            })
            .finally(() => {
              this.screenFlag = false;
            });
        }
      } else {
        this.msgModal = '닉네임 중복확인을 해주세요.';
        this.middleModalFlag = true;
      }
    },
    clickModalOk () {
      this.middleModalFlag = false;
    },
  },
};
</script>

<style>
</style>
