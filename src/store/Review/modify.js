import axios from "axios";

export const actions = {
  modify(context, params) {
    return new Promise((resolve, reject) => {
      // this.$axios.get('/auth/dummy',{params:{dummy:'ss'}})
      //   .then((res)=>{
      const PATH_API = '/review'
      axios.put(`/api/v2${PATH_API}`, params, {
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
