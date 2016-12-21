<template>
    <main id="main">
	    <div class="content">
		    <transition name="fadein">
			    <loader :state="loading" v-if="loading"/>
		    </transition>
			<p class="error" v-if="error">Une erreur est survenue: {{ error }}</p>
			<vue-markdown :source="content || ''"></vue-markdown>
	    </div>
    </main>
</template>

<style src="../style/page.css" />

<script>
	import VueMarkdown from 'vue-markdown'
	import Loader from './Loader.vue';
	import fetch from "../utils/fetch";

    export default{
        data(){
            return{
	            content: null,
	            error: null,
	            loading: "init"
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
        	fetchContent: function(){
        		const vm = this;
		        return fetch(`static/pages/${this.$route.params.pageName}.md`)
			        .then(content => {
				        vm.loading = null;
				        vm.error = null;
				        vm.content = content;
			        })
			        .catch(error => {
				        vm.loading = null;
				        vm.error = `${error.status} - ${error.statusText}`;
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
