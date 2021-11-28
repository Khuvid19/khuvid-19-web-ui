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
    <button
      class="
        absolute
        bottom-3
        right-1/2
        w-24
        h-8
        rounded-full
        flex
        justify-center
        items-center
        border border-primary
        bg-white
        text-primary
        transform
        translate-x-1/2
      "
      @click="clickWriteBtn"
    >
      <fa-icon class="text-md mr-2" icon="pen" />
      <div>글쓰기</div>
    </button>

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

export default {
  components: {
    SearchComponent,
    ListItem,
    WriteScreen,
    DetailScreen,
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
