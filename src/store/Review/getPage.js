export const state = () => ({
  pageContents: null,
  pageParams: {
    total: 0,
    size: 10,
    page: 0,
    sort: [],
    filters: {},
  },
});

export const getters = {
  getPageContents: (state) => [{
    authorAge: "UNDER_TEEN",
    authorGender: "FEMALE",
    createdDate: "2021-11-21T09:20:01.475Z",
    detailDisc: "string",
    diseaseDisc: "string",
    haveDisease: true,
    inoculatedDate: "2021-11-21T09:20:01.475Z",
    sideEffects: [
      "LOW_FEVER",
      "LOW_FEVER",
      "HIGH_FEVER",
      "MUSCLE_PAIN",
      "NAUSEA",
      "HIGH_FEVER",
      "MUSCLE_PAIN",
      "NAUSEA",
      "JOINT_PAIN",
    ],
    vaccine: "ANSEN",
  },
  {
    authorAge: "UNDER_TEEN",
    authorGender: "FEMALE",
    createdDate: "2021-11-21T09:20:01.475Z",
    detailDisc: "string",
    diseaseDisc: "string",
    haveDisease: true,
    inoculatedDate: "2021-11-21T09:20:01.475Z",
    sideEffects: [
      "LOW_FEVER",
      "LOW_FEVER",
      "HIGH_FEVER",
      "MUSCLE_PAIN",
      "NAUSEA",
      "HIGH_FEVER",
      "MUSCLE_PAIN",
      "NAUSEA",
      "JOINT_PAIN",
    ],
    vaccine: "ANSEN",
  },
  {
    authorAge: "UNDER_TEEN",
    authorGender: "FEMALE",
    createdDate: "2021-11-21T09:20:01.475Z",
    detailDisc: "string",
    diseaseDisc: "string",
    haveDisease: true,
    inoculatedDate: "2021-11-21T09:20:01.475Z",
    sideEffects: [
      "LOW_FEVER",
      "LOW_FEVER",
      "HIGH_FEVER",
      "MUSCLE_PAIN",
      "NAUSEA",
      "HIGH_FEVER",
      "MUSCLE_PAIN",
      "NAUSEA",
      "JOINT_PAIN",
    ],
    vaccine: "ANSEN",
  },
  {
    authorAge: "UNDER_TEEN",
    authorGender: "FEMALE",
    createdDate: "2021-11-21T09:20:01.475Z",
    detailDisc: "string",
    diseaseDisc: "string",
    haveDisease: true,
    inoculatedDate: "2021-11-21T09:20:01.475Z",
    sideEffects: [
      "LOW_FEVER",
      "LOW_FEVER",
      "HIGH_FEVER",
      "MUSCLE_PAIN",
      "NAUSEA",
      "HIGH_FEVER",
      "MUSCLE_PAIN",
      "NAUSEA",
      "JOINT_PAIN",
    ],
    vaccine: "ANSEN",
  },
  ],
  // getPageContents: (state) => state.pageContents,
  getPageParams: (state) => state.pageParams,
  getPagination: (state) => {
    const { total, size, page } = state.pageParams;
    return { total, size, page: page + 1 };
  },
};

export const actions = {
  fetchPageContents(context, params) {
    return new Promise((resolve, reject) => {
      this.$axios({
        url: '/review/search',
        method: 'post',
        params: {
          filters: params.filters,
          page: params.page,
        },
      })
        .then((r) => {
          context.commit('SET_PAGE_CONTENTS', r.data);
          resolve(r.data);
        })
        .catch((error) => reject(error));
    });
  },
  setPageParams(context, params) {
    context.commit('SET_PAGE_PARAMS', params);
  },
  clearPageParams(context) {
    context.commit('DEL_PAGE_PARAMS');
  },
  setPagination(context, params) {
    context.commit('SET_PAGINATION', params);
  },
};

export const mutations = {
  SET_PAGE_CONTENTS: (state, result) => {
    state.pageContents = result.content;
    state.pageParams.total = result.totalElements;
    state.pageParams.page = result.number;
    state.pageParams.size = result.size;
  },
  DEL_PAGE_CONTENTS: (state) => {
    state.pageContents = null;
  },
  SET_PAGE_PARAMS: (state, data) => {
    state.pageParams = JSON.parse(JSON.stringify(data));
  },
  SET_PAGINATION: (state, data) => {
    state.pageParams.page = data.page;
    state.pageParams.size = data.size;
  },
  DEL_PAGE_PARAMS: (state) => {
    state.pageParams = {
      total: 0,
      size: 10,
      page: 0,
      sort: [],
      filters: {},
    };
  },
};
