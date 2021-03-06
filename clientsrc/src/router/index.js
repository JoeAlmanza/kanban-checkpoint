import Vue from "vue";
import Router from "vue-router";
// @ts-ignore
import Home from "../pages/Home.vue";
// @ts-ignore
import Dashboard from "../pages/Dashboard.vue";
// @ts-ignore
import Board from "../pages/Board.vue";
// @ts-ignore
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      beforeEnter: authGuard,
    },
    {
      path: "/boards/:id",
      name: "board",
      component: Board,
      beforeEnter: authGuard,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
