import React from 'react';
import { connect } from 'react-redux';
import Layout from './Layout';
import ProductForm from './ProductForm';
import { initiateAddProduct } from '../actions/products';

class AddProduct extends React.Component {
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
        initiateAddProduct({ ...product, price: parseFloat(product.price) })
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
    return (
      <Layout>
        <ProductForm
          handleFormSubmit={this.handleFormSubmit}
          page="add"
          errorMsg={this.state.errorMsg}
        />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error
  };
};

export default connect(mapStateToProps)(AddProduct);
