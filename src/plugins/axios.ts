import Vue from 'vue'
import axios, { AxiosInstance } from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/json'
Vue.use((v) => {
  v.prototype.$axios = axios
})

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

