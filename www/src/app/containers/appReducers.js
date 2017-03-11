import { fromJS } from 'immutable';

const initState = fromJS({
  blogs: {
    blogsMap: {},
    total: 0,
    pageSize: 50,
    pageIndex: 0,
  },
  bookmarks: {},
  resume: {},
});

function fromListToMap(list = []) {
  const map = {};
  list.map(item => (map[item.id] = item));
  return map;
}

const appReducers = (state = initState, action) => {
  switch (action.type) {
    case 'REQUEST_BLOGS_SUCCESS':
      return state
        .setIn(['blogs', 'total'], action.payload.total)
        .setIn(['blogs', 'pageIndex'], action.payload.pageIndex)
        .mergeIn(['blogs', 'blogsMap'], fromListToMap(action.payload.blogs));
    case 'REQUEST_RESUME_SUCCESS':
      return state
        .set('resume', action.payload);
    default:
      return state;
  }
};

export default appReducers;
