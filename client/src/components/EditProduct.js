import React from 'react';
import { connect } from 'react-redux';
import Layout from './Layout';
import ProductForm from './ProductForm';
import { initiateEditProduct } from '../actions/products';
import { Redirect } from 'react-router-dom';

class EditProduct extends React.Component {
  state = {
    errorMsg: ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== this.props.error) {
      this.setState({ errorMsg: this.props.error });
    }
  }

  handleFormSubmit = (product) => {
    this.setState({ errorMsg: '' });
    this.props
      .dispatch(
        initiateEditProduct({ ...product, price: parseFloat(product.price) })
      )
      .then(() => {
        const { errorMsg } = this.state;
        if (errorMsg === '') {
          const { history } = this.props;

          history.push('/');
        }
      });
  };

  render() {
    const { product } = this.props;
    return (
      <Layout>
        {product ? (
          <ProductForm
            handleFormSubmit={this.handleFormSubmit}
            {...product}
            page="edit"
            errorMsg={this.state.errorMsg}
          />
        ) : (
          <Redirect to="/" />
        )}
      </Layout>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    product: state.products.find(
      (product) => product.skuId === props.location.state.skuId
    ),
    error: state.error
  };
};

export default connect(mapStateToProps)(EditProduct);
