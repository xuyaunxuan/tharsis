import Vue from 'vue';
import Router from 'vue-router';
import Error404 from '@/components/Error404.vue'

Vue.use(Router);
const router: Router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    redirect: 'overview',
    component: resolve => import(`@/components/Home.vue`),
    children: [
      {
        path: '/',
        name: 'overview',
        component: resolve => import(`@/components/pages/Overview.vue`),
      },
      {
        path: '/subscribe',
        name: 'subscribe',
        component: resolve => import(`@/components/pages/artical/Writing.vue`),
      },
    ],
  },
]
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