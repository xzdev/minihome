import 'whatwg-fetch';
import { apiFetch } from './utils';

const apiRoot = '/api';

export function fetchBlogs(payload) {
  return apiFetch(`${apiRoot}/blogs`, { queryParams: payload }).then(response => response.json());
}

export function fetchResume() {
  return apiFetch(`${apiRoot}/resume`).then(response => response.json());
}

export function fetchBookmarks() {

}

