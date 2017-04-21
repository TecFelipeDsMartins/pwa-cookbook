<template>
	<vue-markdown :source="content || ''"></vue-markdown>
</template>

<script>
	import VueMarkdown from 'vue-markdown'

	export default {
		components: {VueMarkdown},
		props     : {content: String }
	}
</script>
