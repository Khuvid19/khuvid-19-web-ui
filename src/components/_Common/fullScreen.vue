<template>
  <div
    v-show="value"
    class="fullScreen transition-all fixed w-screen h-screen z-50 bg-white"
  >
    <header class="grid grid-cols-3 items-center h-16 shadow">
      <fa-icon
        class="ml-5 text-2xl cursor-pointer"
        icon="arrow-left"
        @click="onClickBack"
      />
      <div class="text-xl text-center">{{ title }}</div>
      <div class="text-right mr-5 cursor-pointer" @click="onClickSideBtn">
        {{ sideBtnText }}
      </div>
    </header>
    <main
      :class="`w-full overflow-y-scroll ${
        okText !== null ? 'content-area' : 'h-full'
      }`"
    >
      <slot>1234</slot>
    </main>
    <footer
      v-if="okText !== null"
      class="
        grid
        w-screen
        fixed
        bottom-0
        h-16
        text-center
        items-center
        bg-primary
        cursor-pointer
        text-white text-2xl
      "
      @click="onClickOk"
    >
      <div>{{ okText }}</div>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: false,
      type: Boolean,
    },
    title: {
      default: '',
      type: String,
    },
    sideBtnText: {
      default: '',
      type: String,
    },
    okText: {
      default: null,
      type: String,
    },
  },
  methods: {
    onClickBack() {
      this.$emit('onClickBack', false)
    },
    onClickSideBtn() {
      this.$emit('onClickSideBtn')
    },
    onClickOk() {
      this.$emit('onClickOk')
    },
  },
}
</script>

<style>
</style>