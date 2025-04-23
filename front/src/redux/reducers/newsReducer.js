import actionTypes from '../../constants/actionTypes';

const initialState = {
  newsList: [],
  loading: false,
  error: '',
};

const newsReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case actionTypes.NEWS_FETCH_SUCCEEDED:
      return {
        ...state,
        error: '',
        newsList: [...payload],
        loading: false,
      };
    case actionTypes.ADD_NEWS_REQUESTED:
      return { ...state, error: '', loading: true };
    case actionTypes.ADD_NEWS_SUCCEEDED:
      return { ...state, error: '', loading: false };
    case actionTypes.ADD_NEWS_FAILED:
      return { ...state, error: payload, loading: false };
    case actionTypes.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default newsReducer;
