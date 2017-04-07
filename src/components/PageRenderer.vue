<template>
    <main id="main">
	    <div class="content">
		    <transition name="fadein">
			    <loader :state="loading" v-if="loading"/>
		    </transition>
			<p class="error" v-if="error">{{ error }}</p>
		    <component v-if="section.component"
		               :is="section.component"
		               ref="pageComponent"
		               :content="content">
		    </component>
		    <vue-markdown v-else :source="content || ''"></vue-markdown>
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

    export default{
        data(){
            return {
	            content: null,
	            error: null,
	            loading: "init",
	            section: null
            }
        },

	    created(){
        	this.fetchContent()
	    },

	    watch: {
		    '$route' (to, from) {
		    	this.loading = "change-page";
		    	this.error = null;
		    	this.content = null;
			    this.fetchContent();
		    }
	    },

	    methods: {
		    fetchContent(){
			    const vm = this;
			    const { pageName } = this.$route.params;

			    vm.section = getSectionByLink(pageName);

			    return fetch(`static/pages/${pageName}.md`)
				    .then(content => {
					    vm.loading = null;
					    vm.error = null;
					    vm.content = content;
					    vm.$nextTick(() => {
						    Prism.highlightAll();
						    const {pageComponent} = vm.$refs;
						    if (pageComponent && pageComponent.onLoad) {
							    pageComponent.onLoad();
						    }
					    });
				    })
				    .catch(error => {
					    vm.loading = null;
					    if (error.status === 404) {
						    vm.error = "Page introuvable :("
					    } else {
					    	console.error(error);
						    vm.error = `Une erreur est survenue: ${error.status} - ${error.statusText}`;
					    }
					    vm.content = null;
				    })
		    }
	    },

        components: {
	        VueMarkdown,
	        Loader
        }
    }
</script>
