<template>
  <div class="pl-4 pr-4 pt-4 h-fll">
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
    <div
      class="mt-4 mb-2 w-full bg-gray-300 rounded-full"
      style="height: 2px"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'BoardDetailScreen',
}
</script>

<style scoped lang="scss">
.write-textarea {
  height: calc(100vh - theme('spacing.50'));
}
</style>