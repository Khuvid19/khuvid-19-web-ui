export default function ({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    // config.headers.common[]
    // console.log('config', config)
    // console.log(store.state.user)
    // console.log('Making request to ' + config.url)
  })
  
//   $axios.onError(error => {
//     const code = parseInt(error.response && error.response.status)
//     if (code === 400) {
//       redirect('/400')
//     }
//   })
}