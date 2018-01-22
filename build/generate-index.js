const fs = require('fs');

const foreach = (arr, fn) => arr.map(fn).join('\n');

const generateIndex = locale => {
	const pages = require(`../static/pages/${locale}/index.json`);
	return `## Index
${foreach(pages.chapters, chapter => `
### ${ chapter.title }

${foreach(chapter.sections, section =>
	`- [${section.title}](static/pages/${section.link}.md)`
)}`)}`
}

const replaceContent = (file, content) => {
	fs.writeFileSync(file, fs.readFileSync(file).toString().replace(
		/## Index[\s\S]*<!--- END_INDEX -->/,
		content + `\n\n<!--- END_INDEX -->`)
	);
}

const indexEn = generateIndex("en") + `

Ce cookbook est aussi disponible [en Français](static/pages/fr/index.md).`

const indexFr = generateIndex("fr") + `

This cookbook is also available [in English](static/pages/en/index.md).`

replaceContent('README.md', indexEn)
replaceContent('static/pages/en/index.md', indexEn)
replaceContent('static/pages/fr/index.md', indexFr)
