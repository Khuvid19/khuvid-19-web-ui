<template>
  <full-screen
    v-model="screenFlag"
    :title="mode === 'edit' ? '게시글 수정' : '게시글 쓰기'"
    ok-text="완료"
    class="bg-dark"
    @onClickBack="onClickBack"
    @onClickOk="onClickOk"
  >
    <div class="pl-4 pr-4 pt-4 h-fll bg-dark-200">
      <input
        v-model="title"
        :maxlength="100"
        placeholder="제목을 입력해주세요."
        class="
          rounded-lg
          border-2
          focus:border-primary
          outline-none
          p-1
          pl-2
          w-full
          mb-2
          bg-dark
        "
      >
      <textarea
        v-model="content"
        :maxlength="5000"
        placeholder="내용을 입력해주세요."
        class="
          border-2
          p-2
          focus:border-primary
          outline-none
          w-full
          rounded-lg
          h-auto
          write-textarea
          resize-none
          bg-dark
        "
      />
    </div>
    <middle-modal
      :check-flag="middleModalFlag"
      :text="modalMsg"
      ok-text="확인"
      class="bg-dark-200"
      @clickOk="clickModalOk"
    />
  </full-screen>
</template>

<script>
import fullScreen from '@/components/_Common/fullScreen';
import MiddleModal from '@/components/_Common/middleModal';
export default {
  name: 'BoardWriteScreen',
  components: { fullScreen, MiddleModal },
  props: {
    mode: {
      type: String,
      default: 'add',
    },
    editTitle: {
      type: String,
      default: null,
    },
    editContent: {
      type: String,
      default: null,
    },
    boardId: {
      type: Number,
      default: null,
    },
  },
  data () {
    return {
      middleModalFlag: false,
      screenFlag: false,
      title: '',
      content: '',
      modalMsg: '',
    };
  },
  watch: {
    screenFlag: {
      immediate: true,
      handler (newVal) {
        if (newVal && this.mode === 'edit') {
          this.title = this.editTitle;
          this.content = this.editContent;
        }
      },
    },
  },
  methods: {
    onClickBack () {
      this.title = '';
      this.content = '';
      this.screenFlag = false;
    },
    clickModalOk () {
      this.middleModalFlag = false;
    },
    onClickOk () {
      if (this.title === '') {
        this.modalMsg = '제목을 입력하세요.';
        this.middleModalFlag = true;
        return;
      } else if (this.content === '') {
        this.modalMsg = '내용을 입력하세요.';
        this.middleModalFlag = true;
        return;
      }

      const params = {
        title: this.title,
        content: this.content,
      };

      if (this.mode === 'add') {
        this.$axios.post('board', params).then(() => {
          this.$emit('afterWrite');
          this.onClickBack();
        });
      } else if (this.mode === 'edit') {
        params.boardId = this.boardId;
        this.$axios.put('board', params).then(() => {
          this.$emit('afterEdit');
          this.onClickBack();
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.write-textarea {
  height: calc(100vh - theme('spacing.50'));
}
</style>
