export const actions = {
  remove(context, params) {
    return new Promise((resolve, reject) => {
      this.api.sysProp.removeSysProp(params.id)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  },
};
