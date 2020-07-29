import {
  ADD_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW,
  CLEAR_REVIEWS
} from '../utils/constants';
import {
  GET_REVIEWS_QUERY,
  ADD_REVIEW_QUERY,
  DELETE_REVIEW_QUERY
} from '../utils/queries';
import { getClient } from '../utils/client';
import { getError, clearError } from './error';

export const addReview = (skuId, review) => {
  return {
    type: ADD_REVIEW,
    skuId,
    review
  };
};

export const getReviews = ({ skuId, reviews }) => {
  return {
    type: GET_REVIEWS,
    skuId,
    reviews
  };
};

export const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  };
};

export const clearReviews = () => {
  return {
    type: CLEAR_REVIEWS
  };
};

export const initiateGetReviews = (skuId) => {
  return (dispatch) => {
    const client = getClient(dispatch);

    const variables = {
      skuId
    };

    return client
      .query({
        query: GET_REVIEWS_QUERY,
        variables
      })
      .then((response) => {
        if (response) {
          dispatch(clearError());
          return dispatch(
            getReviews({
              skuId,
              reviews: response.data.reviews
            })
          );
        }
      })
      .catch(
        (error) => error.response && dispatch(getError(error.response.data))
      );
  };
};

export const initiateAddReview = (skuId, review) => {
  return (dispatch) => {
    const { title, comment } = review;

    const client = getClient(dispatch);

    const variables = {
      skuId,
      title,
      comment
    };

    return client
      .mutate({
        mutation: ADD_REVIEW_QUERY,
        variables
      })
      .then((response) => {
        if (response) {
          dispatch(clearError());
          dispatch(addReview(skuId, response.data.addReview));
        }
      })
      .catch(
        (error) => error.response && dispatch(getError(error.response.data))
      );
  };
};

export const initiateDeleteReview = (reviewId) => {
  return (dispatch) => {
    const client = getClient(dispatch);

    const variables = {
      reviewId
    };

    return client
      .mutate({
        mutation: DELETE_REVIEW_QUERY,
        variables
      })
      .then((response) => {
        if (response && response.data.deleteReview) {
          dispatch(clearError());
          return dispatch(deleteReview(reviewId));
        }
      })
      .catch(
        (error) => error.response && dispatch(getError(error.response.data))
      );
  };
};
