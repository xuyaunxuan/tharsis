import Vue from 'vue'
import axios, { AxiosInstance } from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/json'
Vue.use((v) => {
  v.prototype.$axios = axios
})
// axios.interceptors.response.use(
//   function (error) {
//     alert('サーバに接続エラーが発生しました。')
//     console.log(123)
//     return Promise.reject(error)
//   },
// )
// axios.interceptors.response.use((response) => {
//   console.log(response)
//   return response.data
// })

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
  }
}


axios.interceptors.request.use(
  function (config) {
    let token = sessionStorage.getItem('token')
    if (token != null) {
      config.headers.common['Authorization'] = token
    }
    return config
  },
)

// Add a response interceptor
// axios.interceptors.response.use(

//   function (error) {
//     // Do something with response error
//     if (error && error.response) {
//       switch (error.response.status) {
//         case 500:
//           alert('サーバに接続エラーが発生しました。')
//           break
//         case 401:
//           alert(i18n.t('MESSAGE.E00041'))
//           break
//         case 403:
//           alert('アクセス拒否')
//           break
//         default:
//           alert('接続エラー:' + error.response.status)
//       }
//       router.push({ name: 'Login' })
//     }
//     Loading.service({}).close()
//     return Promise.reject(error)
//   },
// )

