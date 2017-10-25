import fetch from "unfetch";

const delay = (ms=0) => new Promise((resolve) => setTimeout(resolve,ms));

export default function(url, options={}){
	options = Object.assign({
		delay: 0
	}, options);

	return delay(options.delay)
		.then(() => fetch(url, options))
		.then(res => url.endsWith('json') ? res.json() : res.text())
}
