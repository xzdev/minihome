import 'whatwg-fetch';
import { apiFetch } from './utils';

export function fetchBlogs(payload) {
  return apiFetch('/blogs', { queryParams: payload }).then(response => response.json());
}

export function fetchResume() {

}

export function fetchBookmarks() {

}

