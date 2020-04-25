import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import CovidBoard from "../views/CovidBoard.vue";
import Uplifter from "../views/Uplifter.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/covidboard",
    name: "Covid-19 Dashboard",
    component: CovidBoard,
  },
  {
    path: "/uplifter",
    name: "Uplifter",
    component: Uplifter,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
