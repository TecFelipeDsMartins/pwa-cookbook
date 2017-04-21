const fs = require('fs');

const { pages, sections } = require("../src/pages");

const foreach = (arr, fn) => arr.map(fn).join('\n');

let md = `# Index

${foreach(pages.chapters, chapter => 
`## ${ chapter.title }

${foreach(chapter.sections, section => 
`- [${section.title}](static/pages/${section.link}.md)`
)}
`)}`;

fs.writeFileSync('index.md', md);


