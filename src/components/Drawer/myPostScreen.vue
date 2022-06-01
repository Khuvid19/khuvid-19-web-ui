<template>
  <full-screen
    v-model="screenFlag"
    title="내가 쓴 글"
    class="bg-dark"
    @onClickBack="onClickBack"
  >
    <div class="my-post-list pt-2 overflow-y-scroll bg-gray-100 bg-dark">
      <list-item
        v-for="item in myBoardList"
        :key="item.id"
        :title="item.title"
        :date="item.date"
        :content="item.content"
        :nickname="item.user.nickName"
        :comment-cnt="item.comments"
        class="bg-dark-200"
        @click="clickBoardItem(item.id)"
        @fetchBoardList="fetchBoardList"
      />
    </div>
    <detail-screen
      ref="detailScreen"
      :board-id="boardId"
      @afterEdit="fetchBoardList"
    />
  </full-screen>
</template>

<script>
import ListItem from '../Board/listItem';
import DetailScreen from '../Board/Screen/detailScreen/detailScreen';
import FullScreen from '../_Common/fullScreen';

export default {
  components: {
    FullScreen,
    ListItem,
    DetailScreen,
  },
  data () {
    return {
      screenFlag: false,
      myBoardList: null,
      boardId: null,
    };
  },
  watch: {
    screenFlag: {
      handler (newVal) {
        if (newVal) { this.fetchBoardList(); }
      },
    },
  },
  methods: {
    fetchBoardList () {
      this.$axios.get('board/user').then((r) => {
        this.myBoardList = r.data;
      });
    },
    onClickBack () {
      this.screenFlag = false;
    },
    clickBoardItem (boardId) {
      this.boardId = boardId;
      this.$refs.detailScreen.screenFlag = true;
    },
  },
};
</script>

<style>
</style>
