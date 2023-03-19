import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "homeMain",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/todo-main",
    name: "todoMain",
    component: () => import("@/views/TodoListView.vue"),
  },
  {
    path: "/moneyBook-main",
    name: "moneyBookMain",
    component: () => import("@/views/MoneyBookView.vue"),
  },
  {
    path: "/setting-main",
    name: "settingMain",
    component: () => import("@/views/SettingView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
