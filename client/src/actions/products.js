import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT
} from '../utils/constants';
import {
  GET_PRODUCTS_QUERY,
  ADD_PRODUCT_QUERY,
  EDIT_PRODUCT_QUERY,
  DELETE_PRODUCT_QUERY
} from '../utils/queries';
import { getClient } from '../utils/client';

import { getError, clearError } from './error';

export const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  };
};

export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product
  };
};

export const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product
  };
};

export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product
  };
};

export const initiateGetProducts = () => {
  return (dispatch) => {
    const client = getClient(dispatch);
    return client
      .query({
        query: GET_PRODUCTS_QUERY
      })
      .then((response) => {
        if (response) {
          dispatch(clearError());
          return dispatch(getProducts(response.data.products));
        }
      })
      .catch(
        (error) => error.response && dispatch(getError(error.response.data))
      );
  };
};

export const initiateAddProduct = (product) => {
  return (dispatch) => {
    const { skuId, name, description, price } = product;

    const client = getClient(dispatch);

    const variables = {
      skuId,
      name,
      description,
      price
    };

    return client
      .mutate({
        mutation: ADD_PRODUCT_QUERY,
        variables
      })
      .then((response) => {
        if (response) {
          dispatch(clearError());
          return dispatch(addProduct(response.data.addProduct));
        }
      })
      .catch(
        (error) => error.response && dispatch(getError(error.response.data))
      );
  };
};

export const initiateEditProduct = (product) => {
  return (dispatch) => {
    const { skuId, name, description, price } = product;

    const client = getClient(dispatch);

    const variables = {
      skuId,
      name,
      description,
      price
    };

    return client
      .mutate({
        mutation: EDIT_PRODUCT_QUERY,
        variables
      })
      .then((response) => {
        if (response) {
          dispatch(clearError());
          return dispatch(editProduct(response.data.editProduct));
        }
      })
      .catch(
        (error) => error.response && dispatch(getError(error.response.data))
      );
  };
};

export const initiateDeleteProduct = (skuId) => {
  return (dispatch) => {
    const client = getClient(dispatch);

    const variables = {
      skuId
    };

    return client
      .mutate({
        mutation: DELETE_PRODUCT_QUERY,
        variables
      })
      .then((response) => {
        if (response) {
          dispatch(clearError());
          return dispatch(deleteProduct(response.data.deleteProduct));
        }
      })
      .catch(
        (error) => error.response && dispatch(getError(error.response.data))
      );
  };
};
