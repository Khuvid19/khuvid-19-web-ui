
export const actions = {
  modify (context, params) {
    return new Promise((resolve, reject) => {
      this.$axios.put('/review', params)
        .then((data) => {
          resolve(data);
        })
        .catch(error => reject(error));
    });
  },
};
