<template>
  <div>
    <div class="w-full rounded-md mb-2 pl-4 pr-4">
      <div class="flex justify-between align-middle mb-1">
        <div class="text-sm font-bold">{{ nickname }}</div>
        <div class="flex text-2xs align-middle">
          {{ mm_formatDate(date) }}
        </div>
      </div>
      <div class="text-xs">{{ content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nickname: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
  },
}
</script>

<style>
</style>