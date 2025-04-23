import { call, put, takeEvery } from 'redux-saga/effects';

import newsAPI from '../../api/newsAPI';
import authAPI from '../../api/authAPI';
import {
  setNews,
  setErrorNews,
  addNews,
} from '../actions/newsAction';
import { setUserData } from '../actions/authAction';
import actionTypes from '../../constants/actionTypes';

function* getNewsFetchWorker() {
  try {
    const newsList = yield call(newsAPI.getNews);
    yield put(setNews(newsList));
  } catch (e) {
    const userData = yield call(authAPI.refresh);
    localStorage.setItem('accessToken', userData.token);
    yield put(setUserData(userData));
  }
}

function* addNewsFetchWorker({ payload }) {
  try {
    const { img, data } = payload;
    const formData = new FormData();
    formData.append('file', img);

    const keys = Object.keys(data);
    const values = Object.values(data);
    for (let i = 0; i < keys.length; i += 1) {
      formData.append(keys[i], values[i]);
    }
    const news = yield call(newsAPI.addNews, formData);
    yield put(addNews(news));
  } catch (e) {
    yield put(setErrorNews(e.message));
  }
}

function* newsWatcher() {
  yield takeEvery(actionTypes.NEWS_FETCH_REQUESTED, getNewsFetchWorker);
  yield takeEvery(actionTypes.ADD_NEWS_REQUESTED, addNewsFetchWorker);
}

export default newsWatcher;
