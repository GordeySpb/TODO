export const fetchFactory = (url, params) => { 
	return fetch(url, params)
}

export const fetchPostFactory = (url, params) => {
	return fetchFactory(url, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(params)
	})

	.then((res) => res.json())
}