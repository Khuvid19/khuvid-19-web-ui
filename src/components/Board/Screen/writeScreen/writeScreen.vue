<template>
  <full-screen
    v-model="screenFlag"
    :title="mode === 'edit' ? '게시글 수정' : '게시글 쓰기'"
    ok-text="완료"
    @onClickBack="onClickBack"
    @onClickOk="onClickOk"
  >
    <div class="pl-4 pr-4 pt-4 h-fll">
      <input
        v-model="title"
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
        v-model="content"
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
  </full-screen>
</template>

<script>
import fullScreen from '@/components/_Common/fullScreen'
export default {
  name: 'BoardWriteScreen',
  components: { fullScreen },
  props: {
    mode: {
      type: String,
      default: 'add',
    },
    editTitle: {
      type: String,
      default: null,
    },
    editContent: {
      type: String,
      default: null,
    },
    boardId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      screenFlag: false,
      title: '',
      content: '',
    }
  },
  watch: {
    screenFlag: {
      immediate: true,
      handler(newVal) {
        if (newVal && this.mode === 'edit') {
          this.title = this.editTitle
          this.content = this.editContent
        }
      },
    },
  },
  methods: {
    onClickBack() {
      this.title = ''
      this.content = ''
      this.screenFlag = false
    },
    onClickOk() {
      const params = {
        title: this.title,
        content: this.content,
      }

      if (this.mode === 'add') {
        this.$axios.post('board', params).then(() => {
          this.$emit('afterWrite')
          this.onClickBack()
        })
      } else if (this.mode === 'edit') {
        params.boardId = this.boardId
        this.$axios.put('board', params).then(() => {
          this.$emit('afterEdit')
          this.onClickBack()
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.write-textarea {
  height: calc(100vh - theme('spacing.50'));
}
</style>