<template>
	<main id="main" :class="'page-'+$route.params.pageName">
		<div class="content">
			<transition name="fadein">
				<loader :state="loading" v-if="loading"/>
			</transition>
			<div class="error" v-if="error">
				<p>{{ $t('an error occured') }}</p>
				<p>{{ error }}</p>
			</div>
			<vue-markdown :source="content || ''"></vue-markdown>
		</div>
	</main>
</template>

<style src="../style/page.css" />
<style src="prismjs/themes/prism.css" />

<script>
	import VueMarkdown from 'vue-markdown'
	import Loader from './Loader.vue';
	import fetch from "../utils/fetch";
	import Prism from 'prismjs';

	import {getSectionByLink} from "../pages";

	export default {
		data() {
			return {
				content: null,
				error  : null,
				loading: "init",
				section: null
			}
		},

		created() {
			this.fetchContent()
		},

		watch: {
			'$route'() {
				this.loading = "change-page";
				this.error = null;
				this.content = null;
				this.fetchContent();
			},
			'$i18n.locale'() {
				this.loading = "init";
				this.error = null;
				this.content = null;
				this.fetchContent();
			}
		},

		methods: {
			fetchContent() {
				const vm = this;
				const {pageName} = this.$route.params;

				return Promise.all([
					getSectionByLink(pageName, this.$i18n.locale),
					fetch(`static/pages/${this.$i18n.locale}/${pageName}.md`)
				])
				.then(([section, content]) => {
					vm.loading = null;
					vm.error = null;
					vm.section = section;
					vm.content = content
					.replace(/]\(([^\)]*)\.md\)/g, "](#/$1)")
					.replace(/href="(.*?)\.md/g, 'href="#/$1')
					.replace(/src="\.\./g, 'src="static/')
					vm.$nextTick(() => {
						Prism.highlightAll();
						this.onLoad()
					});
				})
				.catch(error => {
					vm.loading = null;
					console.error(error);
					vm.error = error.status === 404 ? vm.$t("404") : error;
					vm.content = null;
				})
			},

			onLoad() {
				if (this.$route.params.pageName === "checklist") {
					for (let li of document.querySelectorAll("#main .content li")) {
						let cb = document.createElement("input");
						cb.type = "checkbox";
						cb.value = li.textContent
							.slice(0, 50)
							.replace(/\s/g, "_")
							.replace(/[^[\w]/g, "");
						cb.checked = localStorage.getItem(cb.value) === "true";
						cb.addEventListener("change", function () {
							localStorage.setItem(cb.value, cb.checked.toString());
						});
						li.insertBefore(cb, li.firstChild);
					}
				}
			}
		},

		components: {
			Loader,
			VueMarkdown
		}
	}
</script>

<i18n>
{
	"en": {
		"an error occured": "An error occured:",
		"404": "Page not found :("
	},
	"fr": {
		"an error occured": "Une erreur est survenue:",
		"404": "Page introuvable :("
	}
}
</i18n>
