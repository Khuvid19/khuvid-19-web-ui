<template>
  <div>
    <SearchComponent />
    <div class="board-list overflow-y-scroll">
      <ListItem @click="moveToWrite" />
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
    <FullScreen
      v-model="screenFlag"
      :title="screenTitle"
      :ok-text="screenOkText"
      @onClickBack="screenFlag = false"
    >
      <WriteScreen />
    </FullScreen>
  </div>
</template>

<script>
import SearchComponent from '@/components/Board/search'
import ListItem from '@/components/Board/listItem'
import FullScreen from '@/components/_Common/fullScreen'
import WriteScreen from '@/components/Board/Screen/writeScreen'

export default {
  components: { SearchComponent, ListItem, FullScreen, WriteScreen },
  data() {
    return {
      screenFlag: false,
      screenTitle: '',
      screenOkText: '',
    }
  },
  methods: {
    moveToWrite() {
      this.screenTitle = '글쓰기'
      this.screenOkText = '완료'
      this.screenFlag = true
    },
    onClickBack() {
      console.log('hi')
    },
  },
}
</script>
