<template>
  <div class="drawer-side">
    <label for="my-drawer-4" class="drawer-overlay"></label>
    <ul
      class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content pt-14"
    >
      <div class="flex align-middle pl-4 mb-12">
        <div class="avatar self-center mr-4">
          <div class="rounded-full w-20 h-20 self-center">
            <img
              class="self-center"
              :src="$auth.$state.user ? $auth.$state.user.picture : ''"
            />
          </div>
        </div>
        <div class="self-center">
          <div class="text-lg font-bold">세균맨</div>
          <div class="text-sm">
            {{ $auth.$state.user ? $auth.$state.user.email : '' }}
          </div>
        </div>
      </div>
      <li class="mb-2">
        <a><fa-icon class="text-2xl mr-6" :icon="['fas', 'user']" />내 정보</a>
      </li>
      <li class="mb-2">
        <a
          ><fa-icon class="text-2xl mr-5" :icon="['fas', 'edit']" />작성 후기</a
        >
      </li>
      <li>
        <a
          ><fa-icon class="text-2xl mr-7" :icon="['fas', 'file-alt']" />내가 쓴
          글</a
        >
      </li>
      <li class="bottom-5 absolute">
        <a @click="clickLogout"
          ><fa-icon
            class="text-2xl mr-6"
            :icon="['fas', 'sign-out-alt']"
          />로그아웃</a
        >
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