import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT
} from '../utils/constants';

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    case EDIT_PRODUCT:
      return state.map((product) => {
        if (product.skuId === action.product.skuId) {
          return {
            ...product,
            ...action.product
          };
        } else {
          return product;
        }
      });
    case DELETE_PRODUCT:
      return state.filter((product) => product.skuId !== action.product.skuId);
    default:
      return state;
  }
};

export default productsReducer;
