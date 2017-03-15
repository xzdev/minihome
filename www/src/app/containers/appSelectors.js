import { createSelector } from 'reselect';

export const selectApp = state => state.get('app');

export const selectBlogs = createSelector(selectApp, app => app.get('blogs').toJS());

export const selectBookmarks = createSelector(selectApp, app => app.bookmarks);
export const selectResume = createSelector(selectApp, app => app.get('resume'));
