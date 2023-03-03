// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/modules/home/Home.vue"
          ),
      },
    ],
  },
  {
    path: "/developers",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Developers",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/modules/developers/Developers.vue"
          ),
      },
    ],
  },
  {
    path: "/levels",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Levels",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/modules/levels/Levels.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
