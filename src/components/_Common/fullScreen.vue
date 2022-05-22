<template>
  <transition name="fade">
    <div
      v-if="value"
      class="fullScreen fixed top-0 w-full h-full z-50 bg-white"
    >
      <header class="grid grid-cols-3 items-center h-16 shadow">
        <fa-icon
          class="ml-5 text-2xl cursor-pointer self-center"
          icon="arrow-left"
          @click="onClickBack"
        />
        <div class="text-xl text-center">
          {{ title }}
        </div>
        <div
          v-if="menuList.length !== 0"
          class="dropdown dropdown-end text-right pr-5"
        >
          <fa-icon
            tabindex="0"
            class="text-2xl cursor-pointer padding-5"
            :icon="['fas', 'ellipsis-v']"
            @click="clickEllipsis"
          />
          <ul
            v-if="renderMenu"
            tabindex="0"
            class="
              p-2
              shadow
              menu
              dropdown-content
              bg-base-100
              rounded-box
              w-52
            "
          >
            <li v-for="menu in menuList" :key="menu">
              <a @click="onClickMenu(menu)">{{ menu }}</a>
            </li>
          </ul>
        </div>
        <div v-if="sideBtnText" class="text-right mr-5 cursor-pointer" @click="onClickSideBtn">
          {{ sideBtnText }}
        </div>
      </header>
      <main
        :class="`w-full overflow-y-scroll ${
          okText !== null ? 'content-area' : 'h-full'
        }`"
      >
        <slot />
      </main>
      <footer
        v-if="okText !== null"
        class="
          grid
          w-screen
          fixed
          bottom-0
          h-16
          text-center
          items-center
          bg-primary
          cursor-pointer
          text-white text-2xl
        "
        @click="onClickOk"
      >
        <div>{{ okText }}</div>
      </footer>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      default: false,
      type: Boolean,
    },
    title: {
      default: '',
      type: String,
    },
    sideBtnText: {
      default: '',
      type: String,
    },
    okText: {
      default: null,
      type: String,
    },
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      renderMenu: false,
    };
  },
  methods: {
    onClickBack () {
      this.$emit('onClickBack');
    },
    onClickSideBtn () {
      this.$emit('onClickSideBtn');
    },
    onClickOk () {
      this.$emit('onClickOk');
    },
    onClickMenu (menu) {
      this.renderMenu = false;
      this.$emit('onClickMenu', menu);
    },
    clickEllipsis () {
      this.renderMenu = true;
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}

.fade-enter,
.fade-leave-to {
  transform: translateX(100%);
}
</style>
