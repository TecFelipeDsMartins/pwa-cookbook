import Vue from "vue"
import VueRouter from "vue-router"

import "vue-material/dist/components/mdCore/index.css";
import "vue-material/dist/components/mdButton/index.css";
import "vue-material/dist/components/mdIcon/index.css";
import "vue-material/dist/components/mdSidenav/index.css";
import "vue-material/dist/components/mdBackdrop/index.css";
import "vue-material/dist/components/mdToolbar/index.css";
import "vue-material/dist/components/mdList/index.css";
import "vue-material/dist/components/mdMenu/index.css";

import mdCore from "vue-material/dist/components/mdCore/index";
import mdButton from "vue-material/dist/components/mdButton/index";
import mdIcon from "vue-material/dist/components/mdIcon/index";
import mdSidenav from "vue-material/dist/components/mdSidenav/index";
import mdBackdrop from "vue-material/dist/components/mdBackdrop/index";
import mdToolbar from "vue-material/dist/components/mdToolbar/index";
import mdList from "vue-material/dist/components/mdList/index";
import mdMenu from "vue-material/dist/components/mdMenu/index";

import { directive as onClickaway } from 'vue-clickaway';

import App from "./App"
import { router } from "./routes"

Vue.use(VueRouter);
Vue.use(mdCore);
Vue.use(mdButton);
Vue.use(mdIcon);
Vue.use(mdSidenav);
Vue.use(mdBackdrop);
Vue.use(mdToolbar);
Vue.use(mdList);
Vue.use(mdMenu);

Vue.directive("clickaway", onClickaway);

export default new Vue({
	el    : '#app',
	render: h => h(App),
	router
});
