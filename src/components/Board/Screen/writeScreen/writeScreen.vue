<template>
  <div class="pl-4 pr-4 pt-4 h-fll">
    <input
      placeholder="제목을 입력해주세요."
      class="
        rounded-lg
        border-2
        focus:border-primary
        outline-none
        p-1
        pl-2
        w-full
        mb-2
      "
    />
    <textarea
      placeholder="내용을 입력해주세요."
      class="
        border-2
        p-2
        focus:border-primary
        outline-none
        w-full
        rounded-lg
        h-auto
        write-textarea
        resize-none
      "
    />
  </div>
</template>

<script>
export default {
  name: 'BoardWriteScreen',
}
</script>

<style scoped lang="scss">
.write-textarea {
  height: calc(100vh - theme('spacing.50'));
}
</style>