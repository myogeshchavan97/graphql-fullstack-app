import {
  ADD_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW,
  CLEAR_REVIEWS
} from '../utils/constants';

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      const { skuId, review } = action;
      return { skuId, list: [review, ...state.list] };
    case GET_REVIEWS: {
      const { skuId, reviews } = action;
      return { skuId, list: reviews };
    }
    case DELETE_REVIEW:
      return {
        skuId: state.skuId,
        list: state.list.filter((review) => review._id !== action.reviewId)
      };
    case CLEAR_REVIEWS:
      return {};
    default:
      return state;
  }
};

export default reviewsReducer;
