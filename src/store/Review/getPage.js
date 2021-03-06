import axios from 'axios';

export const state = () => ({
  pageContents: [],
  pageParams: {},

});

export const getters = {
  getPageContents: state => state.pageContents,
  getPageParams: state => state.pageParams,
};

export const actions = {
  fetchPageContents (context, params) {
    return new Promise((resolve, reject) => {
      axios.post('api/v2/review/search?page=0', params)
        .then((r) => {
          context.commit('SET_PAGE_CONTENTS', r.data);
          resolve(r);
        })
        .catch(error => reject(error));
    });
  },
  fetchPageContents2 (context, params) {
    return new Promise((resolve, reject) => {
      axios.post(`api/v2/review/search?page=${params.page}`, params.params)
        .then((r) => {
          context.commit('SET_PAGE_CONTENTS', r.data);
          resolve(r);
        })
        .catch(error => reject(error));
    });
  },
  setPageParams (context, params) {
    context.commit('SET_PAGE_PARAMS', params);
  },
  clearPageParams (context) {
    context.commit('DEL_PAGE_PARAMS');
  },
};

export const mutations = {
  SET_PAGE_CONTENTS: (state, result) => {
    state.pageContents = result.content;
  },
  DEL_PAGE_CONTENTS: (state) => {
    state.pageContents = [];
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
