export function queryParams(paramObj) {
  return Object.keys(paramObj)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(paramObj[k])}`).join('&');
}

export function apiFetch(url, options = {}) {
  let newUrl = url;
  const { queryParams: params, ...remainingOptions } = options;
  if (params) {
    newUrl += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(params);
  }
  return fetch(newUrl, remainingOptions);
}
