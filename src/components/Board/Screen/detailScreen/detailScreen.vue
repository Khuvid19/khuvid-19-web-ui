<template>
  <full-screen
    v-model="screenFlag"
    title="게시글"
    :menu-list="isOwn ? ['수정', '삭제'] : []"
    @onClickBack="onClickBack"
    @onClickMenu="onClickMenu"
  >
    <div
      :class="`h-full overflow-y-scroll ${
        $auth.loggedIn
          ? 'detailMemberScreenContent'
          : 'detailGuestScreenContent'
      }`"
    >
      <DetailContent
        :title="data.title"
        :content="data.content"
        :date="data.date"
        :nickname="data.userName"
      />
      <div
        class="mt-4 mb-2 w-full bg-gray-300 rounded-full"
        style="height: 1px"
      />
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
            />
          </div>
        </template>
      </div>
      <CommentInput
        v-if="$auth.loggedIn"
        :board-id="data.boardId"
        @afterCommentWrite="afterCommentWrite"
      />
    </div>
    <middle-modal
      :check-flag="middleModalFlag"
      text="게시물을 삭제하시겠습니까?"
      ok-text="삭제"
      cancel-text="취소"
      @clickOk="clickModalOk"
      @clickCancel="clickModalCancel"
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
import { mapGetters } from 'vuex';
import WriteScreen from '../writeScreen/writeScreen';
import DetailContent from './detailContent';
import CommentInput from './commentInput';
import CommentItem from './commentItem';
import FullScreen from '@/components/_Common/fullScreen';
import MiddleModal from '@/components/_Common/middleModal';
export default {
  name: 'BoardDetailScreen',
  components: {
    CommentInput,
    CommentItem,
    DetailContent,
    FullScreen,
    WriteScreen,
    MiddleModal,
  },
  props: {
    boardId: {
      type: Number,
      default: null,
    },
  },
  data () {
    return {
      middleModalFlag: false,
      screenFlag: false,
      data: {},
      writeScreenFlag: false,
      isOwn: false,
    };
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  watch: {
    screenFlag: {
      handler (newVal) {
        if (newVal) { this.fetchData(); }
      },
    },
  },
  methods: {
    async fetchData () {
      this.data = (
        await this.$axios.get(`board/detail?boardId=${this.boardId}`)
      ).data;
      if (this.user && this.data.userName === this.user.nickName) { this.isOwn = true; }
    },
    onClickBack () {
      this.screenFlag = false;
    },
    handleBoardDelete () {
      const params = {
        boardId: this.data.boardId,
      };
      this.$axios.delete('board', { data: params }).then((r) => {
        this.$emit('afterEdit');
        this.screenFlag = false;
      });
    },
    onClickMenu (menu) {
      if (menu === '삭제') {
        this.middleModalFlag = true;
      } else if (menu === '수정') {
        this.$refs.writeScreen.screenFlag = true;
      }
    },
    afterCommentWrite () {
      this.fetchData();
      this.$emit('afterEdit');
    },
    afterEdit () {
      this.fetchData();
      this.$emit('afterEdit');
    },
    clickModalCancel () {
      this.middleModalFlag = false;
    },
    clickModalOk () {
      this.middleModalFlag = false;

      const params = {
        boardId: this.data.boardId,
      };

      this.$axios.delete('board', { data: params }).then((r) => {
        this.$emit('afterEdit');
        this.screenFlag = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.write-textarea {
  height: calc(100vh - theme('spacing.50'));
}
.detailGuestScreenContent {
  height: calc(100vh - 4rem);
}
.detailMemberScreenContent {
  height: calc(100vh - 7rem - 0.5rem);
}
</style>
