import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import productsReducer from '../reducers/products';
import reviewsReducer from '../reducers/reviews';
import errorReducer from '../reducers/error';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
    reviews: reviewsReducer,
    error: errorReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
