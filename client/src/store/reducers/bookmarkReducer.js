const initialState = {
  bookmarks: [],
  error: '',
  loading: true,
};

const bookmarkReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'BOOKMARK_LIST':
      return {
        ...state,
        bookmarks: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
