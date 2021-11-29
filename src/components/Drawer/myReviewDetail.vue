<template>
  <full-screen
    v-model="screenFlag"
    title="작성 후기"
    :menu-list="['수정', '삭제']"
    @onClickBack="onClickBack"
    @onClickMenu="onClickMenu"
  >
    <div class="w-screen overflow-y-scroll">
      <div>
        <div>
          <div class="flex mx-4 my-2 gap-2" style="width: calc(100% - 2rem)">
            <div class="w-1/2 card bordered px-1 py-2 bg-white">
              <div class="flex justify-between items-center mx-2">
                <div class="text-lg">나이</div>
                <div class="btn btn-outline btn-primary btn-sm"
                     style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
                  {{ getAgeName(detailContent.authorAge) }}
                </div>
              </div>
            </div>
            <div class="w-1/2 card bordered px-1 py-2 bg-white">
              <div class="flex justify-between items-center mx-2">
                <div class="text-lg">성별</div>
                <div class="btn btn-outline btn-primary btn-sm"
                     style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
                  {{ getGenderName(detailContent.authorGender) }}
                </div>
              </div>
            </div>
          </div>
          <div class="card mx-4 my-2 gap-2 bordered px-1 py-2 bg-white">
            <div class="flex justify-between items-center mx-2">
              <div class="text-lg">백신 종류</div>
              <div class="btn btn-outline btn-primary btn-sm"
                   style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
                {{ getVaccineName(detailContent.vaccine) }}
              </div>
            </div>
          </div>
          <div class="card mx-4 my-2 gap-2 bordered px-1 py-2 bg-white">
            <div class="flex justify-between items-center mx-2">
              <div class="text-lg">접종날짜</div>
              <div class="btn btn-outline btn-primary btn-sm"
                   style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
                {{ detailContent.inoculatedDate.slice(0, 10) }}
              </div>
            </div>
          </div>
          <div class="card mx-4 my-2 gap-2 bordered px-1 py-2 bg-white">
            <div class="mx-2">
              <div class="flex justify-between items-center">
                <div class="text-lg">기저질환</div>
                <div class="btn btn-outline btn-primary btn-sm"
                     style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
                  {{ detailContent.haveDisease === true ? '있음' : '없음' }}
                </div>
              </div>
              <div v-show="detailContent.haveDisease===true" class="w-full my-2 h-px bg-gray-200"></div>
              <div v-show="detailContent.haveDisease===true" class="pl-1 pb-1">
                {{ detailContent.diseaseDisc }}
              </div>
            </div>
          </div>
          <div v-if="detailContent.sideEffects.length===0" class="card mx-4 my-2 gap-2 bordered px-1 py-2 bg-white">
            <div class="mx-2">
              <div class="flex justify-between items-center">
                <div class="text-lg">이상반응</div>
                <div class="btn btn-outline btn-primary btn-sm"
                     style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
                  없음
                </div>
              </div>
            </div>
          </div>
          <div v-else class="card bordered px-3 py-4 mx-4 my-2 bg-white">
            <div class="text-lg mb-1 ml-1">이상반응</div>
            <div>
              <div v-for="(item,idx) in detailContent.sideEffects" :key="idx"
                   class="m-1 btn  btn-primary btn-sm"
                   style="background-color: white; color: #65C3C8;
                 border: 1px solid #65C3C8">
                {{ getSideEffectsName(item) }}
              </div>
            </div>
          </div>
          <div v-show="detailContent.detailDisc"
               class="card bordered px-4 py-4 mx-4 my-2 bg-white">
            <div>
              {{ detailContent.detailDisc }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <confirm-modal :check-flag="modalFlag"
                   :text="modalText"
                   :ok-text="okText"
                   :cancel-text="cancelText"
                   @clickOk="clickOk"
                   @clickCancel="clickCancel"
                   @closeModal="closeModal"/>
    <modify-screen
      ref="modifyScreen"
      :detail-content="detailContent"
      @afterModify="afterModify"
    />
  </full-screen>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import fullScreen from '../_Common/fullScreen'
import ModifyScreen from './myReviewModify'
import ConfirmModal from "@/components/Review/confirmModal";
export default {
  components: {
    fullScreen,
    ConfirmModal,
    ModifyScreen,
  },
  props:{
    detailContent: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      screenFlag: false,
      modalFlag: false,
      modalText: '',
      okText: null,
      cancelText: null,
    }
  },
  computed: {
    ...mapGetters({
      getPageContents:'Review/getMyList/getPageContents',
      getSideEffectsName: 'Review/sideEffectsList/getSideEffectsName',
      getVaccineName: 'Review/vaccineList/getVaccineName',
      getAgeName: 'User/getAgeType/getCodeName',
      getGenderName: 'User/getGenderType/getCodeName',
    }),
  },
  created() {
  },
  methods: {
    ...mapActions({
      fetchPageContent:'Review/getMyList/fetchPageContents',
      remove: 'Review/remove/remove',

    }),
    onClickMenu(type) {
      if (type === '수정') {
        this.$refs.modifyScreen.screenFlag = true
      } else if (type === '삭제') {
        this.clickRemove();
      }
    },
    clickRemove() {
      this.modalText = '후기를 삭제하시겠습니까?';
      this.okText = '삭제';
      this.cancelText = '취소';
      this.modalFlag = true;
    },
    onClickBack() {
      this.screenFlag = false
    },
    clickOk() {
      if (this.okText === '삭제') {
        this.remove(this.detailContent.id)
          .then(() => {
            this.screenFlag = false;
            this.fetchPageContent();
          })
      } else if (this.okText === '로그인') {
        this.$auth.loginWith('google', { params: { prompt: 'select_account' } })
      } else {
        this.screenFlag = false;
      }
    },
    afterModify(detail){
      this.$emit('afterModify', detail);
    },
    clickCancel() {
      this.modalFlag = false;
    },
    closeModal() {
      this.modalFlag = false;
    },
  },
}
</script>

<style>
</style>
