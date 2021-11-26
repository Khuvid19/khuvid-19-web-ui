export const state = () => ({
  user: null,
});

export const actions = {
  async nuxtClientInit({ dispatch, commit }, ctx) {
    if(ctx.route.hash !== '') {
    // const userInfo = await ctx.$axios('https://www.googleapis.com/oauth2/v3/userinfo')
    // ctx.$auth.setUser(userInfo)
      await ctx.$auth.fetchUser()
    }

    // 태그 값 fetch
    const promiseList = [
      dispatch('User/getGenderType/fetchListContents'),
      dispatch('User/getAgeType/fetchListContents'),
      dispatch('Review/sideEffectList/fetchListContents'),
      dispatch('Review/vaccineList/fetchListContents'),
    ]

    await Promise.all(promiseList)
  },
  setUser(context, params) {
    context.commit('SET_USER', params)
  },
}

export const getters = {
  getUser: (state) => state.user,
};

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  DEL_USER(state) {
    state.user = null;
  },
};
