import { combineReducers } from 'redux-immutable';

export default function createReducer(asyncReducers) {
  return combineReducers({
    ...asyncReducers,
  });
}
