// src/router.ts
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("./page/stock.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("./page/home.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("./page/Test.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;