import 'whatwg-fetch';
import { apiFetch, apiPost } from './utils';

const apiRoot = '/api';

export function fetchBlogs(payload) {
  return apiFetch(`${apiRoot}/blogs`, { queryParams: payload }).then(response => response.json());
}

export function fetchResume() {
  return apiFetch(`${apiRoot}/resume`).then(response => response.json());
}

export function fetchBookmarks() {
  return apiFetch(`${apiRoot}/bookmarks`).then(response => response.json());
}

export function postBlog(payload) {
  return apiPost(`${apiRoot}/blogs`, payload);
}
