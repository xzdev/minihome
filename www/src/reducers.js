import { combineReducers } from 'redux-immutable';
import appReducers from './app/containers/appReducers';

export default function createReducer(asyncReducers) {
  return combineReducers({
    app: appReducers,
    ...asyncReducers,
  });
}
