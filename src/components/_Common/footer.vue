<template>
  <div class="page-footer">
    <div to="/main" class="footer-col" @click="clickIcon('main')">
      <font-awesome-icon icon="home" style="font-size: 20px" />
      <div>대시보드</div>
    </div>
    <div to="/review" class="footer-col" @click="clickIcon('review')">
      <font-awesome-icon icon="band-aid" style="font-size: 20px" />
      <div>접종후기</div>
    </div>
    <div to="board" class="footer-col" @click="clickIcon('board')">
      <font-awesome-icon icon="clipboard" style="font-size: 20px" />
      <div>게시판</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickIcon(value) {
      if (this.$router.history.current.name !== value)
        this.$router.push(`/${value}`)
    },
  },
}
</script>

<style>
</style>