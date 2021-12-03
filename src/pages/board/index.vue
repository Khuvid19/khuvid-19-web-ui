<template>
  <div>
    <SearchComponent @searchKeyword="fetchBoardListKeyword" />
    <div class="h-px bg-gray-200 m-2"></div>
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
    <middle-modal
      :check-flag="middleModalFlag"
      text="로그인이 필요합니다."
      ok-text="로그인"
      cancel-text="취소"
      @clickOk="clickModalOk"
      @clickCancel="clickModalCancel"
    />
    <write-btn content="글쓰기" @clickWriteBtn="clickWriteBtn" />
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
import MiddleModal from '@/components/_Common/middleModal'
export default {
  components: {
    SearchComponent,
    ListItem,
    WriteScreen,
    DetailScreen,
    WriteBtn,
    MiddleModal,
  },
  data() {
    return {
      middleModalFlag: false,
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
      if (!this.$auth.loggedIn) this.middleModalFlag = true
      else this.$refs.writeScreen.screenFlag = true
    },
    clickModalCancel() {
      this.middleModalFlag = false
    },
    clickModalOk() {
      this.$auth.loginWith('google', { params: { prompt: 'select_account' } })
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
