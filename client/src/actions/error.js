import { GET_ERROR, CLEAR_ERROR } from '../utils/constants';

export const getError = (error) => ({
  type: GET_ERROR,
  error
});

export const clearError = () => ({
  type: CLEAR_ERROR
});
