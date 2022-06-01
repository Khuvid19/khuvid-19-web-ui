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
        @keypress.enter="clickSendBtn"
      >
      <fa-icon
        :class="`text-xl ${
          isEmptyCommentValue ? 'text-gray-400' : 'text-primary'
        }`"
        style="width: 20px"
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
  data () {
    return {
      commentValue: '',
    };
  },
  computed: {
    isEmptyCommentValue () {
      return this.commentValue.trim() === '';
    },
  },
  methods: {
    clickSendBtn () {
      if (this.isEmptyCommentValue) {
        return;
      }
      const params = {
        boardId: this.boardId,
        content: this.commentValue,
      };
      this.$axios.post('board/comment', params).then(() => {
        this.$emit('afterCommentWrite', this.boardId);
        this.commentValue = '';
      });
    },
  },
};
</script>

<style>
</style>
