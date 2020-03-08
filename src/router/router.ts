import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';

Vue.use(Router);
const router: Router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    component: Home,
  }]
})



export default router

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home'
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
//     },
//   ],
// });