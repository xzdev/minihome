import { createSelector } from 'reselect';

export const selectApp = state => state.get('app');

export const selectBlogs = createSelector(selectApp, app => app.get('blogs').toJS());

export const selectBookmarks = createSelector(selectApp, app => (
  app.get('bookmarks') || app.get('bookmarks').toJS()
));

export const selectResume = createSelector(selectApp, app => app.get('resume'));
