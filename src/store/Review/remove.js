
export const actions = {
  remove(context, params) {
    return new Promise((resolve, reject) => {
      this.$axios.delete('/review', {
        params: {id :params},
      })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    })
  },
};
