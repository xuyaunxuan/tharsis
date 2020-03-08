import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/router';
import '@/plugins/element-ui';
import '@/plugins/axios';
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
