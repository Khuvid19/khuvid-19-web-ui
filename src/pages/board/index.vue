<template>
  <div>
    <SearchComponent @searchKeyword="fetchBoardListKeyword" />
    <div class="board-list overflow-y-scroll">
      <ListItem
        v-for="item in boardList"
        :key="item.id"
        :title="item.title"
        :date="item.date"
        :content="item.content"
        :nickname="item.user.nickName"
        :comment-cnt="item.comments"
        @click="clickBoardItem(item.id)"
        @fetchBoardList="fetchBoardList"
      />
    </div>
    <write-btn
      v-if="$auth.loggedIn"
      content="글쓰기"
      @clickWriteBtn="clickWriteBtn"
    />
    <write-screen ref="writeScreen" @afterWrite="fetchBoardList" />
    <detail-screen
      ref="detailScreen"
      :board-id="boardId"
      @afterEdit="fetchBoardList"
    />
  </div>
</template>

<script>
import DetailScreen from '@/components/Board/Screen/detailScreen/detailScreen'
import SearchComponent from '@/components/Board/search'
import ListItem from '@/components/Board/listItem'
import WriteScreen from '@/components/Board/Screen/writeScreen/writeScreen'
import WriteBtn from '@/components/_Common/writeBtn'

export default {
  components: {
    SearchComponent,
    ListItem,
    WriteScreen,
    DetailScreen,
    WriteBtn,
  },
  data() {
    return {
      screenType: null,
      screenFlag: false,
      screenTitle: '',
      screenOkText: '',
      boardList: [],
      boardId: null,
    }
  },
  fetch() {
    this.fetchBoardList()
  },
  methods: {
    async fetchBoardListKeyword(keyword) {
      const res = (await this.$axios.get(`board/list?page=0&search=${keyword}`))
        .data
      this.boardList = res.content
    },
    async fetchBoardList() {
      const res = (await this.$axios.get('board?page=0')).data // 무한 스크롤 구현하기
      this.boardList = res.content
    },
    clickWriteBtn() {
      this.$refs.writeScreen.screenFlag = true
    },
    clickBoardItem(boardId) {
      this.boardId = boardId
      this.$refs.detailScreen.screenFlag = true
    },
    onClickBack() {
      this.screenFlag = false
    },
  },
}
</script>
