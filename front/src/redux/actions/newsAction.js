import { createAction } from 'redux-actions';

import actionTypes from '../../constants/actionTypes';

export const getNewsActionCreator = createAction(
  actionTypes.NEWS_FETCH_REQUESTED,
);

export const setNews = createAction(
  actionTypes.NEWS_FETCH_SUCCEEDED,
);

export const addNewsRequested = createAction(
  actionTypes.ADD_NEWS_REQUESTED,
);

export const setErrorNews = createAction(
  actionTypes.ADD_NEWS_FAILED,
);

export const addNews = createAction(
  actionTypes.ADD_NEWS_SUCCEEDED,
);
