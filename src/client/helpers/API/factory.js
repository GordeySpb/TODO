export const fetchFactory = (url, params) => fetch(url, params);
export const fetchPostFactory = (url, params) => fetchFactory(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(params),
}).then(res => res.json());
