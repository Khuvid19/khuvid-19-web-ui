<template>
  <full-screen
    v-model="screenFlag"
    title="게시글"
    :menu-list="isOwn ? ['수정', '삭제'] : []"
    @onClickBack="onClickBack"
    @onClickMenu="onClickMenu"
  >
    <div class="h-full">
      <DetailContent
        :title="data.title"
        :content="data.content"
        :date="data.date"
        :nickname="data.userName"
      />
      <div
        class="mt-4 mb-2 w-full bg-gray-300 rounded-full"
        style="height: 1px"
      ></div>
      <div class="overflow-y-hidden">
        <template v-for="(comment, idx) in data.commentList">
          <CommentItem
            :key="comment.commentId"
            :nickname="comment.userName"
            :content="comment.content"
            :date="comment.date"
          />
          <div
            v-if="idx !== data.commentList.length - 1"
            :key="`line-${comment.commentId}`"
            class="pl-2 pr-2"
          >
            <div
              class="mt-2 mb-2 w-full bg-gray-200 rounded-full"
              style="height: 1px"
            ></div>
          </div>
        </template>
      </div>
      <CommentInput :board-id="data.boardId" />
    </div>
    <modal
      ref="modal"
      modal-id="deleteBoardModal"
      content="게시물을 삭제하시겠습니까?"
      @clikcOkBtn="handleBoardDelete"
    />
    <write-screen
      ref="writeScreen"
      mode="edit"
      :edit-title="data.title"
      :edit-content="data.content"
      :board-id="data.boardId"
      @afterEdit="afterEdit"
    />
  </full-screen>
</template>

<script>
import { mapGetters } from 'vuex'
import WriteScreen from '../writeScreen/writeScreen'
import DetailContent from './detailContent'
import CommentInput from './commentInput'
import CommentItem from './commentItem'
import FullScreen from '@/components/_Common/fullScreen'
import Modal from '@/components/_Common/modal'
export default {
  name: 'BoardDetailScreen',
  components: {
    CommentInput,
    CommentItem,
    DetailContent,
    FullScreen,
    Modal,
    WriteScreen,
  },
  props: {
    boardId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      screenFlag: false,
      data: {},
      writeScreenFlag: false,
      isOwn: false,
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  methods: {
    async fetchData(boardId) {
      this.data = (
        await this.$axios.get(`board/detail?boardId=${boardId}`)
      ).data

      if (this.data.userName === this.user.nickName) this.isOwn = true
    },
    onClickBack() {
      this.screenFlag = false
    },
    handleBoardDelete() {
      const params = {
        boardId: this.data.boardId,
      }
      this.$axios.delete('board', { data: params }).then((r) => {
        this.screenFlag = false
      })
    },
    onClickMenu(menu) {
      if (menu === '삭제') {
        this.$refs.modal.openModal()
      } else if (menu === '수정') {
        this.$refs.writeScreen.screenFlag = true
      }
    },
    afterEdit() {
      this.fetchData(this.data.boardId)
    },
  },
}
</script>

<style scoped lang="scss">
.write-textarea {
  height: calc(100vh - theme('spacing.50'));
}
</style>