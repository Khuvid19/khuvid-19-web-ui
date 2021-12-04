export const state = () => ({
  pageContents: null,

})

export const getters = {
  getPageContents: state => state.pageContents,
}

export const actions = {
  fetchPageContents (context) {
    return new Promise((resolve, reject) => {
      this.$axios({
        url: '/review/my',
        method: 'get',
      })
        .then((r) => {
          context.commit('SET_PAGE_CONTENTS', r.data)
          resolve(r)
        })
        .catch(error => reject(error))
    })
  },
}

export const mutations = {
  SET_PAGE_CONTENTS: (state, result) => {
    state.pageContents = result
  },
  DEL_PAGE_CONTENTS: (state) => {
    state.pageContents = null
  },
}
