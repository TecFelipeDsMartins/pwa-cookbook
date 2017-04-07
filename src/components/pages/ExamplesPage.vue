<template>
	<div>
		<vue-markdown :source="content || ''"></vue-markdown>
		<div class="gallery">
			<ul>
				<li v-for="example in examples">
					<a :href="example.url" target="_blank">
						<img :src="example.thumbnail" :alt="example.name">
						<p>{{example.name}}</p>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<style src="../../style/pages/examples.css" />

<script>
	import VueMarkdown from 'vue-markdown'

	const examples = [
		{
			name: "Twitter Lite",
			url: "https://mobile.twitter.com/",
			thumbnail: "static/assets/gallery/twitter-lite.jpg"
		},
		{
			name: "Paper Planes",
			url: "https://paperplanes.world/",
			thumbnail: "static/assets/gallery/paper-planes.jpg"
		},
		{
			name: "Financial Times",
			url: "https://app.ft.com/",
			thumbnail: "static/assets/gallery/financial-times.jpg"
		},
		{
			name: "Google Spaces",
			url: "https://spaces.google.com/",
			thumbnail: "static/assets/gallery/google-spaces.jpg"
		},
		{
			name: "Voice Memos",
			url: "https://voice-memos.appspot.com/",
			thumbnail: "static/assets/gallery/voice-memos.jpg"
		},
		{
			name: "Progressive Beer",
			url: "https://deanhume.github.io/beer/",
			thumbnail: "static/assets/gallery/progressive-beer.jpg"
		}
	];

	export default {
		components: { VueMarkdown },
		props: { content: String },
		data() {
			return { examples }
		}
	}
</script>
