import fetch from "unfetch";

const delay = (ms=0) => new Promise((resolve) => setTimeout(resolve,ms));

export default function(url, options={}){
	options = Object.assign({
		delay: 0
	}, options);

	return delay(options.delay)
		.then(() => fetch(url, options))
		.then(function(response) {
			if (response.status < 200 || response.status >= 300) throw response;
			return response
		})
		.then(res => url.endsWith('json') ? res.json() : res.text())
}
