import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Welcome from "../views/Welcome.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

import Users from "../views/Users.vue";
import PostTree from "../views/PostTree.vue";

export const router = new VueRouter({
  linkActiveClass: "active",
  linkExactActiveClass: "exact",
  routes: [
    { path: "/welcome", name: "welcome", component: Welcome },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout },
    { path: "/tree", name: "tree", component: PostTree, children: [
      { path: ":slug", name: "tree-slug", component: PostTree }
    ] },
    { path: "/users", name: "users", component: Users }
  ]
});
