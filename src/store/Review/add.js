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
      this.$axios.$post('/review', params, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxZXIiLCJ1c2VyIjp7ImlkIjpudWxsLCJlbWFpbCI6InFlciIsIm5hbWUiOiJxZXIiLCJhY2Nlc3NUb2tlbiI6ImFjY2Vzc190b2tlbiIsInBpY1VybCI6InBpY1VSbCIsIm5pY2tOYW1lIjoicWVyIiwiZ2VuZGVyIjpudWxsLCJhZ2UiOm51bGwsImp3dFRva2VuIjpudWxsfSwicm9sZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE2Mzc1NzEzODMsImV4cCI6MTYzNzY1Nzc4M30.jPzT43PNssO6TS6giNkOPNtl9M-4rTOtR6OBuQbmcgU',
        },
      }).then((data) => {
        resolve(data);
      })
        .catch((error) => reject(error));
    })

    // });
  },
};
