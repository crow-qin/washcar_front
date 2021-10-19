import { createRouter, createWebHashHistory } from 'vue-router';
import CmMain from '@/views/layout/main.vue';
import moduleRoutes from './routes';
import RouterEnums from '../enums/router.enums';
import { getToken } from '@/utils/auth.util';
import { useStore } from 'vuex';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: CmMain,
    children: [
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/about/index.vue')
      },
    ]
  },
  ...moduleRoutes,
  {
    path: '/login',
    name: RouterEnums.LOGIN,
    component: () => import('../views/login/index.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 有token
  if (getToken()) {
    // 如果token存在，不能直接前往登录页面
    if (to.path === '/login') {
      next({path: '/'});
    }
    initState();
    if (!to.matched.length) {
      next({ name: 'Home'});
    }
    next();
  } else {
    if (to.path !== '/login' ) {
      next({ name: RouterEnums.LOGIN });
    }
    next();
  }
});
const store = useStore();
function initState() {
  console.log('test-store', store);
}
export default router;
