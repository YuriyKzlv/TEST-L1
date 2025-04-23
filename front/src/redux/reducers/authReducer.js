import actionTypes from '../../constants/actionTypes';

const initialState = {
  id: null,
  isAuth: false,
  login: null,
  email: null,
  firstName: null,
  lastName: null,
  avatar: null,
  registrationDate: null,
  loading: false,
  error: '',
};

const authReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case actionTypes.AUTH_LOGIN_FETCH_SUCCEEDED:
    case actionTypes.AUTH_REGISTRATION_FETCH_SUCCEEDED:
      return {
        ...state,
        ...payload.user,
        loading: false,
        isAuth: true,
      };

    case actionTypes.RESET_STATE:
      return initialState;

    case actionTypes.EDIT_PROFILE_REQUESTED:
      return { ...state, loading: true, error: '' };
    case actionTypes.EDIT_PROFILE_SUCCEEDED:
      return {
        ...state,
        ...payload,
        loading: false,
        error: '',
      };
    case actionTypes.EDIT_PROFILE_FAILED:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default authReducer;
