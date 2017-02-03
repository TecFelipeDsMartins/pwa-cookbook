<template>
    <div class="search-bar">

	    <md-button class="md-icon-button"
	               @click="onBtnClick"
	               @focus="checkFocus"
	               @blur="checkFocus">
		    <md-icon>search</md-icon>
	    </md-button>

	    <form novalidate
	          @keydown.bubble.down="focusSuggestion(+1)"
	          @keydown.bubble.up="focusSuggestion(-1)"
	          @focusout.bubble="checkFocus"
	          @focusin.bubble="checkFocus"
	          @submit.stop.prevent="submit">

		    <input type="search"
		           placeholder="Rechercher par mot-clé"
		           v-model="query"
		           ref="input"
		           @input="submit">

		    <md-list class="suggestions" ref="suggestions" v-if="query && suggestions">
			    <md-list-item v-for="(section, index) in suggestions">
				    <router-link :to="'/pages/'+section.link" @click.native="fold">
					    {{ section.title }}
				    </router-link>
			    </md-list-item>

			    <li class="no-results" v-if="suggestions.length === 0">
				    Aucune page correspondante
			    </li>
		    </md-list>
	    </form>

    </div>
</template>

<style src="../style/search-bar.css" />

<script>
	import {search} from "../utils/search";
	import * as Vue from "vue";

    export default{
        data(){
        	return {
		        query: "",
		        suggestions: null,
		        currentSuggestion: null
	        }
        },

	    methods: {
		    checkFocus(){
		    	setTimeout(() => {
		    		let hasFocus = document.activeElement.matches(".search-bar *");
		    		if(hasFocus){
		    			this.expand();
				    } else {
		    			this.fold();
				    }
			    }, 10);
		    },

		    expand(){
			    this.$el.classList.add("expanded");
		    },

		    fold(){
			    this.resetSuggestions();
			    this.$el.classList.remove("expanded");
		    },

		    onBtnClick(){
			    this.checkFocus();
			    this.$refs.input.focus();
		    },

		    focusSuggestion(delta){
		    	if(!this.suggestions) return;

			    const nbSuggestions = this.suggestions.length;
			    const suggestions = this.$refs.suggestions.$el.querySelectorAll("a");

		    	if(this.currentSuggestion === null){
		    		this.currentSuggestion = delta > 0 ? 0 : nbSuggestions-1;
			    } else {
				    this.currentSuggestion = (this.currentSuggestion + delta + nbSuggestions) % nbSuggestions;
			    }

			    suggestions[this.currentSuggestion].focus();
		    },

		    resetSuggestions(){
			    this.suggestions = null;
			    this.currentSuggestion = null;
		    },

        	submit(){
		        this.resetSuggestions();
		        search(this.query).then(pagesMatched => {
			        this.suggestions = pagesMatched;
		        });
	        }
	    }
    }
</script>
