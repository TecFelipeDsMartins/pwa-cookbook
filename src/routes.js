import VueRouter from "vue-router";

import PageRenderer from "./components/PageRenderer.vue"

export const routes = [
	{ path: '/pages/:pageName', component: PageRenderer }
];

export const router = new VueRouter({
	routes
});

export default routes;
