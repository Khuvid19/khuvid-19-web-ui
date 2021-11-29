<template>
  <button
    class="
      absolute
      bottom-3
      right-1/2
      w-24
      h-8
      rounded-full
      flex
      justify-center
      items-center
      border border-primary
      bg-white
      text-primary
      transform
      translate-x-1/2
    "
    @click="clickWriteBtn"
  >
    <fa-icon class="text-md mr-2" icon="pen" />
    <div>{{ content }}</div>
  </button>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  methods: {
    clickWriteBtn() {
      this.$emit('clickWriteBtn')
    },
  },
}
</script>

<style>
</style>