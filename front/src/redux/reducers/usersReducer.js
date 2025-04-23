import actionTypes from '../../constants/actionTypes';

const initialState = {
  user: {},
  loading: false,
  errors: {
    getUserByIdError: '',
  },
};

const usersReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case actionTypes.USER_FETCH_SUCCEEDED:
      return { ...state, user: { ...payload }, loading: false };
    case actionTypes.USER_FETCH_FAILED:
      return {
        ...state,
        errors: { ...state.errors, getUserByIdError: payload },
        loading: false,
      };
    case actionTypes.ADD_NEWS_SUCCEEDED:
      return {
        ...state,
        user: {
          ...state.user,
          news: [
            ...state.user.news,
            payload,
          ],
        },
      };
    case actionTypes.EDIT_PROFILE_SUCCEEDED:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload.data,
        },
      };
    case actionTypes.SET_USER_LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
};

export default usersReducer;
