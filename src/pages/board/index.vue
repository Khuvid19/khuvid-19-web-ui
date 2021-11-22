<template>
  <div>
    <SearchComponent />
    <div class="board-list overflow-y-scroll">
      <ListItem
        title="제목"
        content="내용"
        nickname="테스터"
        :comment-cnt="0"
        @click="moveToScreen('detail')"
      />
      <ListItem
        v-for="item in boardList"
        :key="item.id"
        :title="item.title"
        :content="item.content"
        :nickname="item.user.nickName"
        :comment-cnt="item.comments"
        @click="moveToScreen('detail')"
      />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </div>
    <button
      class="absolute bottom-5 right-5 bg-primary w-16 h-16 rounded-full"
      @click="moveToScreen('write')"
    >
      <fa-icon class="text-white text-xl" icon="pen" />
    </button>

    <FullScreen
      v-model="screenFlag"
      :title="screenTitle"
      :ok-text="screenOkText"
      @onClickBack="screenFlag = false"
      @onClickOk="onClickOk"
    >
      <WriteScreen v-if="screenType === 'write'" ref="writeScreen" />
      <DetailScreen v-if="screenType === 'detail'" ref="detailScreen" />
    </FullScreen>
  </div>
</template>

<script>
import SearchComponent from '@/components/Board/search'
import ListItem from '@/components/Board/listItem'
import FullScreen from '@/components/_Common/fullScreen'
import WriteScreen from '@/components/Board/Screen/writeScreen/writeScreen'
import DetailScreen from '@/components/Board/Screen/detailScreen/detailScreen'

export default {
  components: {
    SearchComponent,
    ListItem,
    FullScreen,
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
  async fetch() {
    const res = (await this.$axios.get('board?page=0')).data
    this.boardList = res.content
  },
  methods: {
    moveToScreen(type) {
      this.screenType = type
      switch (type) {
        case 'write':
          this.screenTitle = '글쓰기'
          this.screenOkText = '완료'
          break
        case 'detail':
          this.screenTitle = '게시글'
          this.screenOkText = null
          break
      }
      this.screenFlag = true
    },
    onClickOk() {
      if (this.screenType === 'write') {
        const params = {
          title: this.$refs.writeScreen.title,
          content: this.$refs.writeScreen.content,
        }

        this.$axios.post('board', params).then((r) => {
          console.log('r', r)
        })
      }
    },
  },
}
</script>
