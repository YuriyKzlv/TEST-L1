import { createAction } from 'redux-actions';

import actionTypes from '../../constants/actionTypes';

export const getUserById = createAction(
  actionTypes.USER_FETCH_REQUESTED,
);

export const setUserLoading = createAction(
  actionTypes.SET_USER_LOADING,
);

export const setUserById = createAction(
  actionTypes.USER_FETCH_SUCCEEDED,
);

export const setErrorUser = createAction(
  actionTypes.USER_FETCH_FAILED,
);

export const editProfile = createAction(
  actionTypes.EDIT_PROFILE_REQUESTED,
);

export const editUser = createAction(
  actionTypes.EDIT_PROFILE_SUCCEEDED,
);
