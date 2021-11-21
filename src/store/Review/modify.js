export const actions = {
  modify(context, params) {
    return new Promise((resolve, reject) => {
      this.api.sysProp.modifySysProp(params.id, params.in)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  },
};
