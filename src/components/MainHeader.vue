<i18n>
{
	"en": {
		"en": "English",
		"fr" : "Français"
	},
	"fr": {
		"en": "English",
		"fr": "Français"
	}
}
</i18n>

<template>
	<md-toolbar>
		<div class="md-toolbar-container">
			<md-button class="md-icon-button toggle-sidenav-btn" @click.native="toggleSidenav">
				<md-icon>menu</md-icon>
			</md-button>

			<h2 class="md-title">Progressive Web Apps Cookbook</h2>

			<search-bar/>

			<md-menu md-direction="bottom left">
				<md-button md-menu-trigger>
					<md-icon>language</md-icon>
					<span>{{ $t($i18n.locale) }}</span>
				</md-button>

				<md-menu-content>
					<md-menu-item v-for="l in locales"
					              :key="l"
					              @click="switchLocale(l)">
						{{ $t(l) }}
					</md-menu-item>
				</md-menu-content>
			</md-menu>
		</div>
	</md-toolbar>
</template>

<style scoped src="../style/main-header.css" />

<script>
	import SearchBar from "./SearchBar.vue";
	import {localStore} from "../utils/store";

	export default {
		methods: {
			toggleSidenav(){
				this.$root.$emit("toggle-sidenav")
			},

			switchLocale(l){
				this.$root.$i18n.locale = l;
				localStore.set(localStore.keys.PREF_LOCALE, l)
			}
		},

		computed: {
			locales(){
				return  ["fr", "en"]
					.sort((a,b) => a === this.$i18n.locale ? -1 : a < b ? -1 : 1)
			}
		},

		components: {
			SearchBar
		}
    }
</script>
