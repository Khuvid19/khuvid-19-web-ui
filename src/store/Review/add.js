export const actions = {
  add (context, params) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/review', params)
        .then((data) => {
          resolve(data);
        })
        .catch(error => reject(error));
    });
  },
};
