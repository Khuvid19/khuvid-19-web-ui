<template>
  <div>
    <SearchComponent />
    <div class="board-list overflow-y-scroll">
      <ListItem
        v-for="item in boardList"
        :key="item.id"
        :title="item.title"
        :content="item.content"
        :nickname="item.user.nickName"
        :comment-cnt="item.comments"
        @click="moveToScreen('detailScreen')"
      />
    </div>
    <button
      class="absolute bottom-5 right-5 bg-primary w-16 h-16 rounded-full"
      @click="moveToScreen('writeScreen')"
    >
      <fa-icon class="text-white text-xl" icon="pen" />
    </button>

    <write-screen ref="writeScreen" @afterWrite="fetchBoardList" />
    <detail-screen ref="detailScreen" />
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
    }
  },
  fetch() {
    this.fetchBoardList()
  },
  methods: {
    async fetchBoardList() {
      const res = (await this.$axios.get('board?page=0')).data // 무한 스크롤 구현하기
      this.boardList = res.content
    },
    moveToScreen(type) {
      this.$refs[type].screenFlag = true
    },
    onClickBack() {
      this.screenFlag = false
    },
  },
}
</script>
