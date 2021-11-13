<template>
  <div class="drawer-side">
    <label for="my-drawer-4" class="drawer-overlay">이름</label>
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
      <li>
        <a>내 정보</a>
      </li>
      <li>
        <a>작성 후기</a>
      </li>
      <li>
        <a>내가 쓴 글</a>
      </li>
      <li>
        <a @click="clickLogout">로그아웃</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    clickLogout() {
      this.$auth.logout()
      this.$router.go()
    },
  },
}
</script>

<style>
</style>