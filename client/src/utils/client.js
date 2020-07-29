import ApolloClient from 'apollo-boost';
import { API_URL } from './constants';
import { getError } from '../actions/error';

export const getClient = (dispatch) => {
  const client = new ApolloClient({
    uri: API_URL,
    onError({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        const [error] = graphQLErrors;
        dispatch(getError(error.message));
      } else if (networkError) {
        dispatch(getError('Network error. Error connecting to the server.'));
      }
    }
  });

  return client;
};
