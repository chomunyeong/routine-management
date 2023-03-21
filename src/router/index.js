import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/layouts/AppLayout.vue"),
      children: [
        {
          path: "home-main",
          name: "homeMain",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "todo-main",
          name: "todoMain",
          component: () => import("@/views/TodoListView.vue"),
        },
        {
          path: "money-book-main",
          name: "moneyBookMain",
          component: () => import("@/views/MoneyBookView.vue"),
        },
        {
          path: "/setting-main",
          name: "settingMain",
          component: () => import("@/views/SettingView.vue"),
        },
      ],
    },
  ],
});

export default router;
