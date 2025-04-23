import { call, put, takeEvery } from 'redux-saga/effects';

import usersAPI from '../../api/usersAPI';
import actionTypes from '../../constants/actionTypes';
import createFormData from '../../utils/createFormData';
import { setErrorEditProfile } from '../actions/authAction';
import {
  setUserById,
  setErrorUser,
  setUserLoading,
  editUser,
} from '../actions/usersAction';

function* getUserFetchWorker({ payload }) {
  try {
    yield put(setUserLoading(true));
    const user = yield call(usersAPI.getUserById, payload);
    yield put(setUserById(user));
  } catch (e) {
    yield put(setErrorUser(e.message));
  }
}

function* editProfileWorker({ payload }) {
  try {
    const formData = createFormData(payload);
    const update = yield call(usersAPI.editUser, formData);
    yield put(editUser(update));
  } catch (e) {
    yield put(setErrorEditProfile(e.message));
  }
}

function* usersWatcher() {
  yield takeEvery(actionTypes.USER_FETCH_REQUESTED, getUserFetchWorker);
  yield takeEvery(actionTypes.EDIT_PROFILE_REQUESTED, editProfileWorker);
}

export default usersWatcher;
