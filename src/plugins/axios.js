export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    if (store.state.user) {
      config.headers.Authorization = `Bearer ${store.state.user.jwtToken}`
    }
    // console.log('Making request to ' + config.url)
  })

//   $axios.onError(error => {
//     const code = parseInt(error.response && error.response.status)
//     if (code === 400) {
//       redirect('/400')
//     }
//   })
}
