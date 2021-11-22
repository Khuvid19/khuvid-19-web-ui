import axios from "axios";

export const actions = {
  remove(context, params) {
    return new Promise((resolve, reject) => {
      this.$axios.delete('/review', params, {
        headers: {
          // Authorization: `Baerer ${res.data.jwtToken}`,
        },
      }).then((data) => {
        resolve(data);
      })
        .catch((error) => reject(error));
    })
    // });
  },
};
