import { gql } from 'apollo-boost';
/* PRODUCTS */

export const GET_PRODUCTS_QUERY = gql`
  query {
    products {
      skuId
      name
      description
      price
      updatedAt
    }
  }
`;

export const ADD_PRODUCT_QUERY = gql`
  mutation($skuId: ID!, $name: String!, $description: String!, $price: Float!) {
    addProduct(
      skuId: $skuId
      data: { name: $name, description: $description, price: $price }
    ) {
      skuId
      name
      description
      price
      updatedAt
    }
  }
`;

export const EDIT_PRODUCT_QUERY = gql`
  mutation($skuId: ID!, $name: String!, $description: String!, $price: Float!) {
    editProduct(
      skuId: $skuId
      data: { name: $name, description: $description, price: $price }
    ) {
      skuId
      name
      description
      price
      updatedAt
    }
  }
`;

export const DELETE_PRODUCT_QUERY = gql`
  mutation($skuId: ID!) {
    deleteProduct(skuId: $skuId) {
      skuId
      name
      description
      price
      updatedAt
    }
  }
`;

/* REVIEWS */

export const GET_REVIEWS_QUERY = gql`
  query($skuId: ID!) {
    reviews(skuId: $skuId) {
      _id
      title
      comment
      updatedAt
    }
  }
`;

export const ADD_REVIEW_QUERY = gql`
  mutation($skuId: ID!, $title: String!, $comment: String!) {
    addReview(skuId: $skuId, data: { title: $title, comment: $comment }) {
      _id
      title
      comment
      updatedAt
    }
  }
`;

export const DELETE_REVIEW_QUERY = gql`
  mutation($reviewId: ID!) {
    deleteReview(reviewId: $reviewId)
  }
`;
