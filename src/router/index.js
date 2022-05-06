import { createRouter, createWebHashHistory } from "vue-router";
import CmMain from "@/views/layout/main.vue";
import moduleRoutes from "./routes";
import RouterEnums from "../enums/router.enums.js";
import { getToken, getUser } from "@/utils/auth.util.js";
import store from '@/store';

const routes = [
  {
    path: "/",
    name: "Home",
    component: CmMain,
    children: [
      {
        path: "about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/about/index.vue"),
      },
    ],
  },
  ...moduleRoutes,
  {
    path: "/login",
    name: RouterEnums.LOGIN,
    component: () => import("../views/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 有token
  if (!from.name && to.name != RouterEnums.LOGIN) {
    initState();
  }
  if (getUser().userId) {
    // 如果token存在，不能直接前往登录页面
    if (to.path === "/login") {
      next({ path: "/" });
    }
    if (!to.matched.length) {
      next({ name: "Home" });
      return;
    }
    next();
    return;
  }
  if (to.path !== "/login") {
    next({ name: RouterEnums.LOGIN });
    return;
  }
  next();

});
function initState() {
  const { user } = store.state;
  if (!user.userId) {
    const userLocal = getUser();
    if (userLocal.userId) {
      store.commit('setUser', userLocal);
    }
  }
  return store.state.user;
}
export default router;
