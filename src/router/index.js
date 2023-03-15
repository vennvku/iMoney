import { createRouter, createWebHistory } from "vue-router";

//Auth Guards
const requireAuth = (to, from, next) => {
  const userStorage = JSON.parse(localStorage.getItem("user"));

  if (!userStorage) next({ name: "Login", params: {} });
  else next();
};

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      text: "Hey, Quoc Van",
      leading: true,
      actions: "notification",
      isShowFooter: true,
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/index.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "logout" */ "../views/logout.vue"),
  },
  {
    path: "/report",
    name: "Report",
    meta: {
      text: "Report",
      leading: false,
      actions: "filter",
      isShowFooter: true,
    },
    component: () =>
      import(/* webpackChunkName: "report" */ "../views/report.vue"),
  },
  {
    path: "/budget",
    name: "Budget",
    meta: {
      text: "Budget",
      leading: false,
      actions: "notification",
      isShowFooter: true,
    },
    component: () =>
      import(/* webpackChunkName: "budget" */ "../views/budget.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      text: "Profile",
      leading: false,
      actions: "setting",
      isShowFooter: true,
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/profile.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/new-transaction",
    name: "NewTransaction",
    meta: {
      text: "New Transaction",
      leading: false,
      actions: "add",
      isShowFooter: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "transaction" */ "../views/new-transaction.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/category",
    name: "Category",
    meta: {
      backActions: "back-category",
      text: "Select a Category",
      leading: false,
      isShowFooter: false,
    },
    component: () =>
      import(/* webpackChunkName: "category" */ "../views/category.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/detail-category",
    name: "DetailCategory",
    meta: {
      backActions: "back-detail-category",
      text: "List of Category",
      leading: false,
      isShowFooter: false,
    },
    component: () =>
      import(/* webpackChunkName: "category" */ "../views/detail-category.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/detail-transaction",
    name: "DetailTransaction",
    meta: {
      backActions: "back-detail-transaction",
      leading: false,
      actions: "goto-update",
      isShowFooter: false,
    },
    component: () =>
      import(
        /* webpackChunkName: "detailtransaction" */ "../views/detail-transaction.vue"
      ),
    beforeEnter: requireAuth,
  },
  {
    path: "/update-transaction",
    name: "UpdateTransaction",
    meta: {
      text: "Update Transaction",
      leading: false,
      actions: "save-update",
      isShowFooter: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "transaction" */ "../views/update-transaction.vue"
      ),
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
