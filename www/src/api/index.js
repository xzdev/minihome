import 'whatwg-fetch';

export function fetchBlogs() {
  return fetch('/blogs').then(response => response.json());
}

export function fetchResume() {

}

export function fetchBookmarks() {

}

