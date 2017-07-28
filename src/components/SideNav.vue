<template>
	<md-sidenav class="md-left md-fixed" :class="{ modal: isModal }" ref="sidenav">
		<md-toolbar>
			<div class="md-toolbar-container">
				<h3 class="md-title">Table des matières</h3>
				<md-button @click="close" class="md-icon-button md-raised">
					<md-icon>close</md-icon>
				</md-button>
			</div>
		</md-toolbar>

		<md-list>
			<md-list-item v-for="chapter in pages.chapters" :key="chapter.title">
				<span>{{ chapter.title }}</span>
				<md-list-expand v-if="chapter.sections">
					<md-list-item v-for="section in chapter.sections" :key="section.title">
						<router-link :to="'/'+section.link" @click.native="closeIfModal">
							{{ section.title }}
						</router-link>
					</md-list-item>
				</md-list-expand>
			</md-list-item>
		</md-list>

	</md-sidenav>
</template>

<style src="../style/sidenav.css" />

<script>
import { pages } from "../pages";

export default {
	mounted(){
		this.$root.$on("toggle-sidenav", this.toggle);
		if(!this.isModal) this.open();
	},

	created: function () {
		this.updateSize();
		window.addEventListener('resize', this.updateSize)
	},

	beforeDestroy: function () {
		window.removeEventListener('resize', this.updateSize)
	},

	data(){
		return {
			isModal: null,
			pages
		}
	},

	methods: {
		close(){
			return this.$refs.sidenav.close();
		},
		closeIfModal(){
			if(this.isModal) this.close();
		},
		open(){
			return this.$refs.sidenav.show(); //https://github.com/marcosmoura/vue-material/issues/238
		},
		toggle(){
			return this.$refs.sidenav.toggle();
		},
		updateSize(){
			this.isModal = window.matchMedia("(max-width: 1280px)").matches;
		}
	}

}
</script>
