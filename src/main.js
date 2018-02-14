import Vue from "vue"
import VueRouter from "vue-router"
import VueI18n from 'vue-i18n'

import "vue-material/dist/components/mdCore/index.css";
import "vue-material/dist/components/mdButton/index.css";
import "vue-material/dist/components/mdIcon/index.css";
import "vue-material/dist/components/mdSidenav/index.css";
import "vue-material/dist/components/mdBackdrop/index.css";
import "vue-material/dist/components/mdToolbar/index.css";
import "vue-material/dist/components/mdList/index.css";
import "vue-material/dist/components/mdMenu/index.css";

import mdCore from "vue-material/dist/components/mdCore/index"; /* FORK: supprimer appel à changeHtmlMetaColor */
import mdButton from "vue-material/dist/components/mdButton/index";
import mdIcon from "vue-material/dist/components/mdIcon/index";
import mdSidenav from "vue-material/dist/components/mdSidenav/index";
import mdBackdrop from "vue-material/dist/components/mdBackdrop/index";
import mdToolbar from "vue-material/dist/components/mdToolbar/index";
import mdList from "vue-material/dist/components/mdList/index";
import mdMenu from "vue-material/dist/components/mdMenu/index";

import { directive as onClickaway } from 'vue-clickaway';

import App from "./App"
import {router} from "./routes"
import {localStore} from "./utils/store";

Vue.use(VueRouter);
Vue.use(VueI18n);
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
	router,

	i18n: new VueI18n({
		locale: localStore.get(localStore.keys.PREF_LOCALE) || (navigator.language === "fr" ? "fr" : "en"),
		fallbackLocale: "en"
	})
});
