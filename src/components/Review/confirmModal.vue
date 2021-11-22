<template>
  <div>
    <input type="checkbox" class="modal-toggle" :checked="checkFlag">
    <div class="modal items-center">
      <div class="modal-box w-11/12 rounded-box px-0 py-2 h-auto">
        <div class="px-4 py-3 text-lg">{{ text }}</div>
        <div class="modal-action w-full px-5 my-3">
          <button v-if="cancelText" class="btn btn-outline btn-primary w-1/2 rounded-xl"
                  @click="clickCancel">{{ cancelText }}</button>
          <button class="btn btn-primary rounded-xl"
                  :class="cancelText?'w-1/2':'w-full'"
                  @click="clickOk">{{ okText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmModal",
  props:{
    checkFlag: {
      type: Boolean,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    okText: {
      type: String,
      default: null,
    },
    cancelText: {
      type: String,
      default: null,
    },
  },
  methods: {
    clickOk(){
      this.closeModal();
    },
    clickCancel(){
      this.closeModal();
    },
    closeModal() {
      this.$emit('closeModal');
    },
  },
}
</script>

<style scoped>

</style>
