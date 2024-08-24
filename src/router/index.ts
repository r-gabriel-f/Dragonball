import { createRouter, createWebHistory } from "vue-router";

import character from "../components/Character.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: character,
    },
  ],
});

export default router;
