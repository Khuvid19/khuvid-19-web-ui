import axios from "axios";

export const actions = {
  remove(context, params) {
    return new Promise((resolve, reject) => {
      // this.$axios.get('/auth/dummy',{params:{dummy:'ss'}})
      //   .then((res)=>{
      const PATH_API = '/review'
      axios.delete(`/api/v2${PATH_API}`, params, {
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
