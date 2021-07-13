import Vue from "vue";
import VueRouter from "vue-router";
import Communicate from "../views/Communicate.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Communicate",
    component: Communicate,
}, ];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;