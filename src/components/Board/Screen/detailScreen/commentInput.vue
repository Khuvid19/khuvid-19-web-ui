<template>
  <div class="fixed bottom-0 w-full h-14 bg-white p-2">
    <div
      class="
        flex
        justify-between
        align-middle
        items-center
        w-full
        bg-gray-200
        h-full
        rounded-xl
        pl-3
        pr-3
      "
    >
      <input
        v-model="commentValue"
        class="bg-transparent outline-none w-full"
      />
      <fa-icon
        class="text-xl text-primary"
        :icon="['far', 'paper-plane']"
        @click="clickSendBtn"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    boardId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      commentValue: '',
    }
  },
  methods: {
    clickSendBtn() {
      const params = {
        boardId: this.boardId,
        content: this.commentValue,
      }
      this.$axios.post('board/comment', params).then(() => {
        this.$emit('afterCommentWrite', this.boardId)
        this.commentValue = null
      })
    },
  },
}
</script>

<style>
</style>