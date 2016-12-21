import "whatwg-fetch";

const delay = (ms=0) => new Promise((resolve) => setTimeout(resolve,ms));

export default function(url, options={}){
	options = Object.assign({
		delay: 0
	}, options);

	return delay(options.delay)
		.then(() => window.fetch(url, options))
		.then(res => res.ok ? res : Promise.reject(res))
		.then(res => res.text())
}
