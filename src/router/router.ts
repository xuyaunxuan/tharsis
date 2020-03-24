import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const router: Router = new Router({
  mode: 'history',
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
          meta: {
            title: '技术宅实验室'
          }
        },
        {
          path: '/subscribe',
          name: 'subscribe',
          component: resolve => import(`@/components/pages/article/Writing.vue`),
          meta: {
            title: '投稿'
          }
        },
        {
          path: '/post/:post_id',
          name: 'post',
          component: resolve => import(`@/components/pages/article/ArticleDetail.vue`),
        },
        {
          path: '/mypage',
          name: 'mypage',
          component: resolve => import(`@/components/pages/creater/PersonalHome.vue`),
          meta: {
            title: '我的文章'
          }
        },
      ],
    },
  ]
})

export default router

router.beforeEach((to, from, next) => {
  if ((to.name !== 'overview' && to.name !== 'post') && sessionStorage.getItem('token') === null) {
    next('/')
  } else {
    // 路由发生变化修改title
    if (to.meta.title) {
      document.title = 'ikenLab - ' + to.meta.title
    }
    next()
  }
})