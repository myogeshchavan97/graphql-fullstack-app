import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default class ProductForm extends React.Component {
  state = {
    skuId: this.props.skuId ? this.props.skuId : '',
    name: this.props.name ? this.props.name : '',
    description: this.props.description ? this.props.description : '',
    price: this.props.price ? this.props.price : '',
    errorMsg: this.props.errorMsg ? this.props.errorMsg : ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errorMsg !== this.props.errorMsg) {
      this.setState({ errorMsg: this.props.errorMsg });
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'price') {
      if (!value || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
        this.setState({
          [name]: value
        });
      }
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fields = ['skuId', 'name', 'description', 'price'];

    const isValid = fields.every((input) => {
      return this.state[input] !== '';
    });
    if (isValid) {
      this.setState({ errorMsg: '' });
      this.props.handleFormSubmit(this.state);
    } else {
      this.setState({ errorMsg: 'Please enter all the fields.' });
    }
  };

  render() {
    const { skuId, name, description, price, errorMsg } = this.state;
    const { page } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        {errorMsg !== '' && <p className="errorMsg">{errorMsg}</p>}
        {page === 'add' ? (
          <Form.Group controlId="skuId">
            <Form.Label>Sku Id</Form.Label>
            <Form.Control
              type="text"
              name="skuId"
              value={skuId}
              placeholder="Enter sku Id"
              onChange={this.handleInputChange}
              autoComplete="off"
            />
          </Form.Group>
        ) : (
          <Form.Group controlId="skuId">
            <Form.Label>
              Sku Id: <strong>{skuId}</strong>
            </Form.Label>
          </Form.Group>
        )}
        <Form.Group controlId="product_name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            placeholder="Enter product name"
            onChange={this.handleInputChange}
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={description}
            placeholder="Enter product description"
            onChange={this.handleInputChange}
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group controlId="product_name">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={price}
            placeholder="Enter product price"
            onChange={this.handleInputChange}
            autoComplete="off"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {page === 'add' ? 'Add Product' : 'Update Product'}
        </Button>
      </Form>
    );
  }
}
