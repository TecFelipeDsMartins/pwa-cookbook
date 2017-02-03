<template>
	<md-toolbar>
		<div class="md-toolbar-container">
			<md-button class="md-icon-button toggle-sidenav-btn" @click="toggleSidenav">
				<md-icon>menu</md-icon>
			</md-button>

			<h2 class="md-title">Progressive Web Apps Cookbook</h2>

			<search-bar/>

			<md-button class="md-icon-button">
				<md-icon>filter_list</md-icon>
			</md-button>
		</div>
	</md-toolbar>
</template>

<style scoped src="../style/main-header.css" />

<script>
	import SearchBar from "./SearchBar.vue";

	export default {
		methods: {
			toggleSidenav(){
				this.$root.$emit("toggle-sidenav")
			}
		},

		components: {
			SearchBar
		}
    }
</script>
