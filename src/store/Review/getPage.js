export const state = () => ({
  pageContents: null,
  pageParams: {},

});

export const getters = {
  getPageContents: (state) => state.pageContents,
  getPageParams: (state) => state.pageParams,
};

export const actions = {
  fetchPageContents(context, params) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/review/search?page=0', params)
        .then((r) => {
          context.commit('SET_PAGE_CONTENTS', r.data);
          resolve(r);
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
};

export const mutations = {
  SET_PAGE_CONTENTS: (state, result) => {
    state.pageContents = result.content;
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
    state.pageParams = {};
  },
};
