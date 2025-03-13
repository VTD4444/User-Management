import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import UpdateUser from "./components/UpdateUser.vue";
import AddPost from "./components/AddPost.vue";
import UpdatePost from "./components/UpdatePost.vue";

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/sign-up",
  },
  {
    name: "Login",
    component: Login,
    path: "/log-in",
  },
  {
    name: "UpdateUser",
    component: UpdateUser,
    path: "/update-user/:id",
  },
  {
    name: "AddPost",
    component: AddPost,
    path: "/add-post",
  },
  {
    name: "UpdatePost",
    component: UpdatePost,
    path: "/update-post/:id",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
