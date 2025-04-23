import { createAction } from 'redux-actions';

import actionTypes from '../../constants/actionTypes';

export const loginUser = createAction(
  actionTypes.AUTH_LOGIN_FETCH_REQUESTED,
);

export const setUserData = createAction(
  actionTypes.AUTH_LOGIN_FETCH_SUCCEEDED,
);

export const registrationUser = createAction(
  actionTypes.AUTH_REGISTRATION_FETCH_REQUESTED,
);

export const registrationGoogle = createAction(
  actionTypes.AUTH_REGISTRATION_GOOGLE_FETCH_REQUESTED,
);

export const logoutUser = createAction(
  actionTypes.AUTH_LOGOUT_FETCH_REQUESTED,
);

export const whoAmI = createAction(
  actionTypes.WHO_AM_I_FETCH_REQUESTED,
);

export const resetState = createAction(
  actionTypes.RESET_STATE,
);

export const setErrorAuth = createAction(
  actionTypes.AUTH_FETCH_FAILED,
);

export const setErrorEditProfile = createAction(
  actionTypes.EDIT_PROFILE_FAILED,
);
