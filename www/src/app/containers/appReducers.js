const initState = {
  blogs: {
    blogsMap: {},
    total: 0,
    pageSize: 50,
    pageIndex: 0,
  },
  bookmarks: {},
  resume: {},
};

function fromListToMap(list) {
  const map = {};
  list.map(item => (map[item.id] = item));
  return map;
}

const appReducers = (state = initState, action) => {
  switch (action.type) {
    case 'REQUEST_BLOGS_SUCCESS':
      return {
        ...state,
        blogs: {
          ...state.blogs,
          total: action.payload.total,
          blogsMap: {
            ...state.blogs.blogsMap,
            ...fromListToMap(action.payload.blogs),
          },
        },
      };
    default:
      return state;
  }
};

export default appReducers;
