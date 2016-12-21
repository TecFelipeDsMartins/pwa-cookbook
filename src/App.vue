<template>
	<div id="app">
		<main-header></main-header>

		<side-nav></side-nav>

		<router-view></router-view>
	</div>
</template>

<style src="./style/main.css" />

<script>
	import MainHeader from "./components/MainHeader.vue"
	import SideNav from "./components/SideNav.vue"

	export default {
		name      : 'app',
		components: {
			MainHeader,
			SideNav
		}
	}
</script>

<style>
</style>
