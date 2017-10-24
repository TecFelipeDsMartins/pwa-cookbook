const fs = require('fs');

require("babel-register")({
	plugins: ["transform-es2015-modules-commonjs"]
});
const { pages, sections } = require("../src/pages");

const foreach = (arr, fn) => arr.map(fn).join('\n');

let md = fs.readFileSync('README.md').toString().replace(/## Index[\s\S]*<!--- END_INDEX -->/,
`## Index

${foreach(pages.chapters, chapter => 
`### ${ chapter.title }

${foreach(chapter.sections, section => 
`- [${section.title}](static/pages/${section.link}.md)`
)}
`)}
<!--- END_INDEX -->`);

fs.writeFileSync('README.md', md);
