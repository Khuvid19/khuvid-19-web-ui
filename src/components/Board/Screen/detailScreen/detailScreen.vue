<template>
  <div class="h-full">
    <div class="p-4">
      <div class="flex items-center mb-2">
        <fa-icon
          :icon="['far', 'user']"
          class="text-4xl bg-white p-1 text-primary rounded"
        />
        <div class="ml-2">
          <div class="text-sm">백신이 너무좋아</div>
          <div class="text-2xs text-gray-400">09/30 12:00</div>
        </div>
      </div>
      <div class="font-bold text-lg mb-2">제목입니다</div>
      <div class="text-sm">
        내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다
      </div>
    </div>
    <div
      class="mt-4 mb-2 w-full bg-gray-300 rounded-full"
      style="height: 1px"
    ></div>
    <template v-for="(el, idx) in [0, 1, 2, 3, 4, 5, 6, 7]">
      <CommentItem :key="idx" />
      <div
        v-if="idx !== [0, 1, 2, 3, 4, 5, 6, 7].length - 1"
        :key="`${idx}i`"
        class="pl-2 pr-2"
      >
        <div
          class="mt-2 mb-2 w-full bg-gray-200 rounded-full"
          style="height: 1px"
        ></div>
      </div>
    </template>
    <CommentInput />
  </div>
</template>

<script>
import CommentInput from './commentInput'
import CommentItem from './commentItem'
export default {
  name: 'BoardDetailScreen',
  components: { CommentInput, CommentItem },
}
</script>

<style scoped lang="scss">
.write-textarea {
  height: calc(100vh - theme('spacing.50'));
}
</style>