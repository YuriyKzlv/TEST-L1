import { call, put, takeEvery } from 'redux-saga/effects';

import authAPI from '../../api/authAPI';
import { setUserData, resetState, setErrorAuth } from '../actions/authAction';
import actionTypes from '../../constants/actionTypes';
import createFormData from '../../utils/createFormData';

function* loginFetchWorker({ payload }) {
  try {
    const userData = yield call(authAPI.login, payload);
    localStorage.setItem('accessToken', userData.token);
    yield put(setUserData(userData));
  } catch (e) {
    yield put(setErrorAuth(e.message));
  }
}
function* registrationFetchWorker({ payload }) {
  try {
    const formData = createFormData(payload);
    const userData = yield call(authAPI.registration, formData);
    localStorage.setItem('accessToken', userData.token);
    yield put(setUserData(userData));
  } catch (e) {
    yield put(setErrorAuth(e.message));
  }
}
function* registrationGoogleFetchWorker() {
  try {
    yield call(authAPI.registrationGoogle);
    const userData = yield call(authAPI.refresh);
    yield put(setUserData(userData));
  } catch (e) {
    yield put(setErrorAuth(e.message));
  }
}
function* logoutFetchWorker() {
  try {
    yield call(authAPI.logout);
    localStorage.clear();
    yield put(resetState());
  } catch (e) {
    yield put(setErrorAuth(e.message));
  }
}
function* whoAmIFetchWorker() {
  try {
    const userData = yield call(authAPI.whoAmI);
    yield put(setUserData(userData));
  } catch (e) {
    yield put(setErrorAuth(e.message));
  }
}

function* authWatcher() {
  yield takeEvery(actionTypes.WHO_AM_I_FETCH_REQUESTED, whoAmIFetchWorker);
  yield takeEvery(actionTypes.AUTH_LOGOUT_FETCH_REQUESTED, logoutFetchWorker);
  yield takeEvery(actionTypes.AUTH_REGISTRATION_FETCH_REQUESTED, registrationFetchWorker);
  yield takeEvery(
    actionTypes.AUTH_REGISTRATION_GOOGLE_FETCH_REQUESTED,
    registrationGoogleFetchWorker,
  );
  yield takeEvery(actionTypes.AUTH_LOGIN_FETCH_REQUESTED, loginFetchWorker);
}

export default authWatcher;
