export const state = () => ({
  listContents: [],
});

export const getters = {
  getListContents: (state) => state.listContents,
};

export const actions = {
  fetchListContents(context) {
    return new Promise((resolve, reject) => {
      this.$axios({
        url: '/review/types/sideEffects',
        method: 'get',
      })
        .then((r) => {
          context.commit('SET_LIST_DATA', r.data);
          resolve(r);
        })
        .catch((e) => {
          console.log(e.response);
          reject(e);
        });
    });
  },
};

export const mutations = {
  SET_LIST_DATA(state, payload) {
    state.listContents = payload;
  },
};
