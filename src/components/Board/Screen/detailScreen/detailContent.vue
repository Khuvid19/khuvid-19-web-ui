<template>
  <div class="p-4">
    <div class="flex items-center mb-2">
      <fa-icon
        :icon="['far', 'user']"
        style="width: 20px"
        class="text-4xl bg-white p-1 text-primary rounded"
      />
      <div class="ml-2">
        <div class="text-sm">
          {{ nickname }}
        </div>
        <div class="text-2xs text-gray-400">
          {{ mm_formatDate(date) }}
        </div>
      </div>
    </div>
    <div class="font-bold text-lg mb-2">
      {{ title }}
    </div>
    <div class="text-sm">
      {{ content }}
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
    nickname: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
  },
};
</script>
