export const state = () => ({
  listContents: [],
})

export const getters = {
  getListContents: state => state.listContents,
  getCodeName: state => (code) => {
    const foundCode = state.listContents.find(v => v.code === code)
    if (foundCode == null) { return '' }
    return foundCode.value
  },
}

export const actions = {
  fetchListContents (context) {
    return new Promise((resolve, reject) => {
      this.$axios({
        url: '/auth/types/age',
        method: 'get',
      })
        .then((r) => {
          context.commit('SET_LIST_DATA', r.data)
          resolve(r)
        })
        .catch((e) => {
          console.log(e.response)
          reject(e)
        })
    })
  },
}

export const mutations = {
  SET_LIST_DATA (state, payload) {
    state.listContents = payload
  },
}
