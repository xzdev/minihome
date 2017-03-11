import { takeEvery, put, call } from 'redux-saga/effects';
import { fetchBlogs } from '../api';

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
    const app = yield call(fetchBlogs, action.payload);
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

function* saga() {
  yield takeEvery('APPLICATION_BOOT_REQUESTED', fetchApp);
  yield takeEvery('REQUEST_RESUME', fetchResume);
}

export default saga;
