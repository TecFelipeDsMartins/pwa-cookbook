const fs = require('fs');

const localesMessages = {
	"fr": "Ce cookbook est aussi disponible [en Français]",
	"en": "This cookbook is also available [in English]"
}

const foreach = (arr, fn) => arr.map(fn).join('\n');

const generateIndex = (locale, relativePath=".") => {
	const index = require(`../static/pages/${locale}/index.json`);
	return `## Index
${foreach(index.chapters, chapter => `
### ${ chapter.title }

${foreach(chapter.sections, section =>
	`- [${section.title}](${relativePath}/${section.link}.md)`
)}`)}

${Object.keys(localesMessages)
	.filter(loc => loc !== locale)
	.map(l => `${localesMessages[l]}(${relativePath}/index.md).`)
	.join('\n')
}`
}

const replaceContent = (file, content) => {
	fs.writeFileSync(file, fs.readFileSync(file).toString().replace(
		/## Index[\s\S]*<!--- END_INDEX -->/,
		content + `\n\n<!--- END_INDEX -->`)
	);
}

replaceContent('README.md', generateIndex("en", "static/pages/en"))
replaceContent('static/pages/en/index.md', generateIndex("en"))
replaceContent('static/pages/fr/index.md', generateIndex("fr"))
