<template>
  <div class="card shadow mx-2 mb-2 bg-white" @click="$emit('click')">
    <div class="card-body p-4">
      <div class="flex justify-between align-top mb-2">
        <div class="text-sm font-bold truncate">
          {{ title }}
        </div>
        <div class="text-2xs text-right w-32">
          {{ mm_formatDate(date) }}
        </div>
      </div>
      <p class="text-sm mb-2">
        {{ ellipsisContent }}
      </p>
      <div class="flex justify-between">
        <div class="text-2xs">
          {{ nickname }}
        </div>
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
      default: '',
    },
    date: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: '',
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
  computed: {
    ellipsisContent () {
      const textLimit = 100;
      if (this.content.length > textLimit) { return this.content.substring(0, textLimit) + '...'; } else { return this.content; };
    },
  },
  methods: {},
};
</script>

<style>
</style>
