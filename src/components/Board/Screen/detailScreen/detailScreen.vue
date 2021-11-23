<template>
  <full-screen v-model="screenFlag" title="게시글" @onClickBack="onClickBack">
    <div class="h-full">
      <DetailContent />
      <div
        class="mt-4 mb-2 w-full bg-gray-300 rounded-full"
        style="height: 1px"
      ></div>
      <div class="overflow-y-hidden">
        <template v-for="(el, idx) in [0, 1, 2, 3, 4, 5, 6, 7, 8]">
          <CommentItem :key="idx" />
          <div
            v-if="idx !== [0, 1, 2, 3, 4, 5, 6, 7, 8].length - 1"
            :key="`${idx}i`"
            class="pl-2 pr-2"
          >
            <div
              class="mt-2 mb-2 w-full bg-gray-200 rounded-full"
              style="height: 1px"
            ></div>
          </div>
        </template>
      </div>
      <CommentInput />
    </div>
  </full-screen>
</template>

<script>
import DetailContent from './detailContent'
import CommentInput from './commentInput'
import CommentItem from './commentItem'
import FullScreen from '@/components/_Common/fullScreen'
export default {
  name: 'BoardDetailScreen',
  components: { CommentInput, CommentItem, DetailContent, FullScreen },
  data() {
    return {
      screenFlag: false,
    }
  },
  methods: {
    onClickBack() {
      this.screenFlag = false
    },
  },
}
</script>

<style scoped lang="scss">
.write-textarea {
  height: calc(100vh - theme('spacing.50'));
}
</style>