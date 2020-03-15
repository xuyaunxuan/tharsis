import Vue from 'vue'
import axios, { AxiosInstance } from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/json'
Vue.use((v) => {
  v.prototype.$axios = axios
})

// axios.interceptors.response.use((response) => {
//   console.log(response)
//   return response.data
// })

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
  }
}


// axios.interceptors.request.use(
//   function (config) {
//     Loading.service({
//       lock: true,
//       text: 'Loading',
//       spinner: 'el-icon-loading',
//       background: 'rgba(0, 0, 0, 0.7)',
//     })
//     let token = sessionStorage.getItem('token')
//     if (token == null) {
//       // dummy code
//       token =
//         'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhcHAyIiwiY3JlYXRlZCI6MTU1MTY5MjAxNjM3NiwiZXhwIjoxNTUyMjk2ODE2fQ.9sE9tCZzicJ-FkBIlEhAkXw4yg0mt-W-OBFxreBWZxLyXTruQKKxYdQa9gybRDRxFnfHV5ww2SnNIOxA3xt2BQ'
//     }

//     config.headers.common['Authorization'] = 'Bearer ' + token
//     return config
//   },
//   function (error) {
//     Loading.service({}).close()
//     return Promise.reject(error)
//   },
// )

// Add a response interceptor
// axios.interceptors.response.use(
//   function (response) {
//     Loading.service({}).close()
//     // Do something with response data
//     return response
//   },
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

