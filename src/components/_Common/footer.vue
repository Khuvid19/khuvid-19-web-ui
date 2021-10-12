<template>
  <div class="page-footer grid grid-cols-3">
    <div
      to="/main"
      :class="`footer-col ${iconBorder('main')}`"
      @click="clickIcon('main')"
    >
      <fa-icon icon="home" />
      <div>대시보드</div>
    </div>
    <div
      to="/review"
      :class="`footer-col ${iconBorder('review')}`"
      @click="clickIcon('review')"
    >
      <fa-icon icon="band-aid" />
      <div>접종후기</div>
    </div>
    <div
      to="board"
      :class="`footer-col ${iconBorder('board')}`"
      @click="clickIcon('board')"
    >
      <fa-icon icon="clipboard" />
      <div>게시판</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: null,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.current = this.$router.history.current.name
  },
  methods: {
    clickIcon(value) {
      if (this.current !== value) {
        this.current = value
        this.$router.push(`/${value}`)
      }
    },
    iconBorder(value) {
      if (this.current === value) return 'bg-base-200'
      return ''
    },
  },
}
</script>

<style>
</style>