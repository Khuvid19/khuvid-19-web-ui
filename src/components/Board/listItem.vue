<template>
  <div class="card shadow mx-2 mb-2 bg-white" @click="$emit('click')">
    <div class="card-body p-4">
      <div class="flex justify-between items-center mb-2">
        <div class="text-lg font-bold truncate">
          {{ title }}
        </div>
        <div class="text-2xs text-right min-w-max">
          {{ mm_formatDate(date) }}
        </div>
      </div>
      <p class="text mb-2 truncate">
        {{ content }}
      </p>
      <div class="flex justify-between items-center">
        <div class="text-2xs ">
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
  methods: {},
};
</script>

<style>
</style>
