<template>
  <div class="page-footer w-full bg-white grid grid-cols-3">
    <div
      to="/main"
      :class="`flex justify-center items-center`"
      @click="clickIcon('main')"
    >
      <div :class="footerIconStyle('main')">
        <fa-icon class="text-2xl self-center" icon="home" />
        <div class="text-2xs text-center">
          대시보드
        </div>
      </div>
    </div>
    <div
      to="/review"
      :class="`flex justify-center items-center`"
      @click="clickIcon('review')"
    >
      <div :class="footerIconStyle('review')">
        <fa-icon class="text-2xl self-center" icon="band-aid" />
        <div class="text-2xs text-center">
          접종후기
        </div>
      </div>
    </div>
    <div
      to="board"
      :class="`flex justify-center items-center`"
      @click="clickIcon('board')"
    >
      <div :class="footerIconStyle('board')">
        <fa-icon class="text-2xl self-center" icon="clipboard" />
        <div class="text-2xs text-center">
          게시판
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: null,
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (newVal) {
        this.current = newVal.name
      },
    },
  },
  methods: {
    clickIcon (value) {
      if (this.current !== value) {
        this.current = value
        this.$router.push(`/${value}`)
      }
    },
    footerIconStyle (value) {
      if (this.current === value) { return 'flex flex-col align-middle bg-primary rounded-lg p-2 w-4/6 text-white' }
      return 'flex flex-col align-middle rounded-lg p-2'
    },
  },
}
</script>

<style>
</style>
