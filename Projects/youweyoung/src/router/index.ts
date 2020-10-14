import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import { UserModule } from "../store/user";
import { mergeMeta ,mainBus} from "@/utils";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      public:1
    }
  },
  {
    path: "/room",
    name: "Room",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "sec" */ "../views/Room.vue"),
  },
  {
    path: "/logon",
    name: "Logon",
    meta: {
      public: 1,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "pub" */ "../views/user/logon.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to)
  if (!to.meta.public && UserModule.role === 0) next({ name: "Logon" });
  else next();
});

export default router;
