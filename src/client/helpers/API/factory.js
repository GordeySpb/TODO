export const fetcFactory = (url, params) => { 
	return fetch(url, params)
}

export const fetchPostFactory = (url, params) => {
	return fetcFactory(url, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: params

		.then((res) => res.json())
		
	})
}