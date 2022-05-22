<template>
  <button
    class="
      absolute
      bottom-3
      right-1/2
      w-28
      h-12
      rounded-full
      flex
      justify-center
      items-center
      border-2 border-gray-300
      bg-gray-100
      transform
      translate-x-1/2
      text-lg
    "
    @click="clickWriteBtn"
  >
    <fa-icon class="mr-2" icon="pen" />
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
    clickWriteBtn () {
      this.$emit('clickWriteBtn');
    },
  },
};
</script>

<style>
</style>
