import { SET_PAGE } from '../actions/actionTypes';

const initialState = {
  currentPage: 'nlanding'
};

const currentPage = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      console.log('in set pages');
      return { ...state, currentPage: action.page };
    default:
      return state;
  }
};

export default currentPage;