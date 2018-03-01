import axios from 'axios';

export function getCollection(params) {
  const { url } = params;

  if (url) {
    return axios
      .get(url)
      .then(response => response.data)
      .then(items => ({ items }));
  }

  return Promise.reject('no url passed');
}
