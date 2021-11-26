<template>
  <div>
    <input :id="modalId" :ref="modalId" type="checkbox" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <p>{{ content }}</p>
        <div class="modal-action">
          <label :for="modalId" class="btn btn-primary" @click="clickOkBtn"
            >확인</label
          >
          <label
            v-if="!hiddenCancelBtn"
            :for="modalId"
            class="btn"
            @click="clickCancelBtn"
            >취소</label
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: null,
    },
    modalId: {
      type: String,
      default: null,
    },
    hiddenCancelBtn: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickOkBtn() {
      this.$emit('clikcOkBtn')
    },
    clickCancelBtn() {
      this.$emit('clickCancelBtn')
    },
    openModal() {
      this.$refs[this.modalId].click()
    },
  },
}
</script>

<style>
</style>