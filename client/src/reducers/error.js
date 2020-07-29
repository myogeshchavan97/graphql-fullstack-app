import { GET_ERROR, CLEAR_ERROR } from '../utils/constants';

const errorReducer = (state = '', action) => {
  switch (action.type) {
    case GET_ERROR:
      return action.error;
    case CLEAR_ERROR:
      return '';
    default:
      return state;
  }
};

export default errorReducer;
