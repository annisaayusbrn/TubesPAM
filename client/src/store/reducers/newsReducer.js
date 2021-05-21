const initialState = {
  news: [],
  error: '',
  loading: true,
};

const newsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'NEWS_LIST':
      return {
        ...state,
        news: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default newsReducer;
