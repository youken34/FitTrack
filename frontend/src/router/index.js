import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import newSessionView from "../views/newSessionView.vue";
import LoginView from "@/views/LoginView.vue";
import { useUserStore } from "@/stores/user";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresGuest: true },
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: { requiresAuth: true },
  },
  {
    path: "/add",
    name: "add",
    component: newSessionView,
    meta: { requiresAuth: true },
  },
  {
    name: "dashboard",
    path: "/",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    name: "profile",
    path: "/profile",
    component: () => import("../views/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard globale
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = !!userStore.token; // token vient du store

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  } else if (to.meta.requiresGuest && isLoggedIn) {
    next("/"); // dashboard
  } else {
    next();
  }
});

export default router;
