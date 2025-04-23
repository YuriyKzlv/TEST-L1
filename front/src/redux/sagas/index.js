import { all, call } from 'redux-saga/effects';

import newsWatcher from './newsSaga';
import authWatcher from './authSaga';
import usersWatcher from './usersSaga';

export default function* rootSaga() {
  yield all([call(newsWatcher), call(authWatcher), call(usersWatcher)]);
}
