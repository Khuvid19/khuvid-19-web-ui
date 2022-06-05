<template>
  <div>
    <SearchComponent @searchKeyword="setKeyword" />
    <div class="h-px bg-gray-200 m-2" />
    <div class="board-list overflow-y-scroll">
      <ListItem
        v-for="item in boardList"
        :key="item.id"
        :title="item.title"
        :date="item.date"
        :content="item.content"
        :nickname="item.user.nickName"
        :comment-cnt="item.comments"
        @click="clickBoardItem(item.id)"
        @fetchBoardList="fetchBoardList"
      />
      <client-only>
        <infinite-loading v-if="boardList.length" @infinite="scrolling">
          <div slot="no-results" />
          <div slot="no-more" />
        </infinite-loading>
      </client-only>
    </div>
    <middle-modal
      :check-flag="middleModalFlag"
      text="로그인 후 작성해 주세요."
      ok-text="로그인"
      cancel-text="취소"
      @clickOk="clickModalOk"
      @clickCancel="clickModalCancel"
    />
    <write-btn content="글쓰기" @clickWriteBtn="clickWriteBtn" />
    <write-screen ref="writeScreen" @afterWrite="afterEdit" />
    <detail-screen
      ref="detailScreen"
      :board-id="boardId"
      @afterEdit="afterEdit"
    />
  </div>
</template>

<script>
import axios from 'axios';
import DetailScreen from '@/components/Board/Screen/detailScreen/detailScreen';
import SearchComponent from '@/components/Board/search';
import ListItem from '@/components/Board/listItem';
import WriteScreen from '@/components/Board/Screen/writeScreen/writeScreen';
import WriteBtn from '@/components/_Common/writeBtn';
import MiddleModal from '@/components/_Common/middleModal';
export default {
  components: {
    SearchComponent,
    ListItem,
    WriteScreen,
    DetailScreen,
    WriteBtn,
    MiddleModal,
  },
  data () {
    return {
      middleModalFlag: false,
      currentPage: 0,
      screenType: null,
      screenFlag: false,
      screenTitle: '',
      screenOkText: '',
      boardList: [],
      boardId: null,
      keyword: '',
    };
  },
  head () {
    return {
      title: 'KHUVID BOARD',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'KHUVID-19는 코로나 19 백신 접종 후기 플랫폼입니다. Board 페이지는 게시판으로 자유로운 주제로 게시물과 댓글을 남길 수 있습니다. ',
        },
      ],
    };
  },
  created () {
    this.fetchBoardList();
  },
  methods: {
    setKeyword (keyword) {
      this.keyword = keyword;
      this.boardList = [];
      this.currentPage = 0;
      this.fetchBoardList();
    },
    afterEdit () {
      this.keyword = '';
      this.boardList = [];
      this.currentPage = 0;
      this.fetchBoardList();
    },
    async fetchBoardList () {
      const res = (await axios.get(`/api/v2/board/list?page=${this.currentPage}&search=${this.keyword}`)).data; // 무한 스크롤 구현하기
      this.boardList = res.content ?? [];
    },
    clickWriteBtn () {
      if (!this.$auth.loggedIn) {
        this.middleModalFlag = true;
      } else {
        this.$refs.writeScreen.screenFlag = true;
      }
    },
    clickModalCancel () {
      this.middleModalFlag = false;
    },
    clickModalOk () {
      this.$auth.loginWith('google', { params: { prompt: 'select_account' } });
    },
    clickBoardItem (boardId) {
      this.boardId = boardId;
      this.$refs.detailScreen.screenFlag = true;
    },
    onClickBack () {
      this.screenFlag = false;
    },
    scrolling ($state) {
      this.currentPage += 1;

      axios.get(`api/v2/board/list?page=${this.currentPage}&search=${this.keyword}`)
        .then((r) => {
          if (r.data.content.length !== 0) {
            this.boardList.push(...r.data.content);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
  },
};
</script>
