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

function* saga() {
  yield takeEvery('APPLICATION_BOOT_REQUESTED', fetchApp);
}

export default saga;
