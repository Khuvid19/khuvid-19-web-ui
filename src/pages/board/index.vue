<template>
  <div>
    <SearchComponent />
    <div class="board-list overflow-y-scroll">
      <ListItem @click="moveToScreen('detail')" />
      <ListItem />
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
    >
      <WriteScreen v-if="screenType === 'write'" />
      <DetailScreen v-if="screenType === 'detail'" />
    </FullScreen>
  </div>
</template>

<script>
import SearchComponent from '@/components/Board/search'
import ListItem from '@/components/Board/listItem'
import FullScreen from '@/components/_Common/fullScreen'
import WriteScreen from '@/components/Board/Screen/writeScreen'
import DetailScreen from '@/components/Board/Screen/detailScreen'

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
    }
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
    onClickBack() {
      console.log('hi')
    },
  },
}
</script>
