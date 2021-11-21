import axios from "axios";

export const actions = {
  add(context, params) {
    return new Promise((resolve, reject) => {
      const params={
        // inputReview:{
        detailDisc: "string",
        diseaseDisc: "string",
        haveDisease: true,
        inoculatedDate: "2021-11-21",
        sideEffects: [
          "LOW_FEVER",
        ],
        vaccine: "ANSEN",
        // },
      };
      this.$axios.get('/auth/dummy',{params:{dummy:'ss'}})
        .then((res)=>{
          const PATH_API = '/review'
          axios.post(`/api/v2${PATH_API}`, params, {
            headers: {
              Authorization: `Baerer ${res.data.jwtToken}`,
            },
          }).then((data) => {
            resolve(data);
          })
            .catch((error) => reject(error));
        })

    });
  },
};
