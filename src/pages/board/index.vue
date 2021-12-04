<template>
  <div>
    <SearchComponent @searchKeyword="setKeyword" />
    <div class="h-px bg-gray-200 m-2" />
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
      <infinite-loading v-if="boardList.length" @infinite="scrolling">
        <div slot="no-results" />
      </infinite-loading>
    </div>
    <middle-modal
      :check-flag="middleModalFlag"
      text="로그인 후 작성해주세요."
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
  data () {
    return {
      middleModalFlag: false,
      currentPage: 0,
      screenType: null,
      screenFlag: false,
      screenTitle: '',
      screenOkText: '',
      boardList: [],
      boardId: null,
      keyword: '',
    }
  },
  fetch () {
    this.fetchBoardList()
  },
  methods: {
    setKeyword (keyword) {
      this.currentPage = 0
      this.keyword = keyword
      this.boardList = []
      this.fetchBoardList()
    },
    async fetchBoardList () {
      const res = (await this.$axios.get(`board/list?page=${this.currentPage}&search=${this.keyword}`)).data // 무한 스크롤 구현하기
      this.boardList.push(...res.content)
    },
    clickWriteBtn () {
      if (!this.$auth.loggedIn) {
        this.middleModalFlag = true
      } else {
        this.$refs.writeScreen.screenFlag = true
      }
    },
    clickModalCancel () {
      this.middleModalFlag = false
    },
    clickModalOk () {
      this.$auth.loginWith('google', { params: { prompt: 'select_account' } })
    },
    clickBoardItem (boardId) {
      this.boardId = boardId
      this.$refs.detailScreen.screenFlag = true
    },
    onClickBack () {
      this.screenFlag = false
    },
    scrolling ($state) {
      this.currentPage += 1
      const beforeLength = this.boardList.length
      this.fetchBoardList()
      const afterLength = this.boardList.length

      if (beforeLength === afterLength) { $state.complete() }
    },
  },
}
</script>
