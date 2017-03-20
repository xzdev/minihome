import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { fetchBlogs, fetchResume as fetchResumeApi, fetchBookmarks as fetchBookmarksApi } from '../api';

function* fetchApp(action) {
  try {
    const app = yield call(fetchBlogs, action.payload);
    yield put({
      type: 'REQUEST_BLOGS_SUCCESS',
      payload: app,
    });
  } catch (e) {
    yield put({
      type: 'APPLICATION_BOOT_FAILED',
      error: e,
    });
  }
}

function* fetchResume(action) {
  try {
    const app = yield call(fetchResumeApi, action.payload);
    yield put({
      type: 'REQUEST_RESUME_SUCCESS',
      payload: app,
    });
  } catch (e) {
    yield put({
      type: 'REQUEST_RESUME_FAILED',
      error: e,
    });
  }
}

function* fetchBookmarks(action) {
  try {
    const app = yield call(fetchBookmarksApi, action.payload);
    yield put({
      type: 'REQUEST_BOOKMARKS_SUCCESS',
      payload: app,
    });
  } catch (e) {
    yield put({
      type: 'REQUEST_BOOKMARKS_FAILED',
      error: e,
    });
  }
}

function* bootSaga() {
  yield takeEvery('APPLICATION_BOOT_REQUESTED', fetchApp);
}

function* resumeSaga() {
  yield takeEvery('REQUEST_RESUME', fetchResume);
}

function* bookmarkSaga() {
  yield takeEvery('REQUEST_BOOKMARKS', fetchBookmarks);
}

function* saga() {
  yield fork(bootSaga);
  yield fork(resumeSaga);
  yield fork(bookmarkSaga);
}

export default saga;
