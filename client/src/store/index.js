import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import newsReducer from './reducers/newsReducer';
import bookmarkReducer from './reducers/bookmarkReducer';

const middleware = [thunk];

const store = createStore(
  combineReducers({
    auth: authReducer,
    news: newsReducer,
    bookmark: bookmarkReducer,
  }),
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
