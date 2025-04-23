import { combineReducers } from 'redux';

import newsReducer from './newsReducer';
import authReducer from './authReducer';
import usersReducer from './usersReducer';

const reducers = combineReducers({
  news: newsReducer,
  auth: authReducer,
  users: usersReducer,
});

export default reducers;
