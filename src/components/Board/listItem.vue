<template>
  <div class="card shadow mx-2 mb-2 bg-white" @click="$emit('click')">
    <div class="card-body p-4">
      <div class="flex justify-between align-middle mb-2">
        <div class="text-sm font-bold">{{ title }}</div>
        <div class="text-2xs flex items-center">{{ mm_formatDate(date) }}</div>
      </div>
      <p class="text-xs mb-2">{{ content }}</p>
      <div class="flex justify-between">
        <div class="text-2xs">{{ nickname }}</div>
        <div class="text-2xs">
          <fa-icon :icon="['far', 'comments']" />
          {{ commentCnt }}개
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
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
    nickname: {
      type: String,
      default: null,
    },
    commentCnt: {
      type: Number,
      default: 0,
    },
  },
  methods: {},
}
</script>

<style>
</style>