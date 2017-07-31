<template>
    <main id="main" :class="'page-'+$route.params.pageName">
	    <div class="content">
		    <transition name="fadein">
			    <loader :state="loading" v-if="loading"/>
		    </transition>
			<p class="error" v-if="error">{{ error }}</p>
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

	const {getSectionByLink} = require("../pages");

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
		    '$route' () {
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
					    vm.content = content
							    .replace(/]\((.*?)\.md/g, "](#/$1")
							    .replace(/href="(.*?)\.md/g, 'href="#/$1');
					    vm.$nextTick(() => {
						    Prism.highlightAll();
						    this.onLoad()
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
		    },

		    onLoad(){
			    if(this.$route.params.pageName === "checklist"){
				    for(let li of document.querySelectorAll("#main .content li")){
					    let cb = document.createElement("input");
					    cb.type = "checkbox";
					    cb.value = li.textContent
							    .slice(0,50)
							    .replace(/\s/g,"_")
							    .replace(/[^[\w]/g, "");
					    cb.checked = localStorage.getItem(cb.value) === "true";
					    cb.addEventListener("change", function(){
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
