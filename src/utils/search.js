import { sections } from "../pages";
import { normalize } from "./string";

export function findInKeywords(keywords, query=""){
	let queryWords = query.trim().split(/\s/).map(str => normalize(str));
	keywords = keywords.trim().split(";").map(str => normalize(str));
	return keywords.some(keyword => queryWords.some(
		queryWord => queryWord.includes(keyword) || keyword.includes(queryWord))
	)
}

export function search(query=""){
	return Promise.resolve(
		sections.filter(page => findInKeywords(page.keywords, query))
	);
}
