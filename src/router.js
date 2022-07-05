// src/router.ts
import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/",
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
