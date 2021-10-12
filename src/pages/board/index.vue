<template>
  <div>
    <SearchComponent />
    <div class="board-list overflow-y-scroll">
      <ListItem />
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
  </div>
</template>

<script>
import SearchComponent from '@/components/Board/search'
import ListItem from '@/components/Board/listItem'

export default {
  components: { SearchComponent, ListItem },
}
</script>
