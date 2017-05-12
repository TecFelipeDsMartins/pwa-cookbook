<template>
	<div class="checklist-page">
		<vue-markdown :source="content || ''"></vue-markdown>
	</div>
</template>

<script>
	import VueMarkdown from 'vue-markdown'

	export default {
		components: { VueMarkdown },
		props: { content: String },

		methods: {
			onLoad(){
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
	}
</script>

<style>
#main .checklist-page {
	ul {
		padding-left:0;
	}

	li {
		list-style: none;
	}

	li input[type="checkbox"] {
		margin-right: 1em;
	}
}
</style>
