import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import ReviewForm from './ReviewForm';
import ProductReviews from './ProductReviews';
import { clearReviews, initiateAddReview } from '../actions/reviews';

Modal.setAppElement('#root');

class ProductModal extends React.Component {
  state = {
    showAddReview: this.props.isOpen ? false : true,
    errorMsg: ''
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== this.props.error) {
      this.setState({ errorMsg: this.props.error });
    }
    if (prevProps.isOpen !== this.props.isOpen) {
      const { dispatch, isOpen } = this.props;
      dispatch(clearReviews());
      this.setState({ showAddReview: isOpen ? false : true });
    }
  }

  handleSubmitReview = (skuId, review) => {
    return this.props.dispatch(initiateAddReview(skuId, review)).then(() => {
      const { errorMsg } = this.state;

      if (errorMsg === '') {
        this.setState({ showAddReview: false });
        return true;
      }
    });
  };

  toggleReview = () => {
    this.setState((prevState) => ({ showAddReview: !prevState.showAddReview }));
  };

  render() {
    const {
      handleProductModalClose,
      isOpen,
      name,
      skuId,
      description,
      price,
      reviews
    } = this.props;

    const { showAddReview, errorMsg } = this.state;

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '600px',
        display: 'flex',
        boxShadow: '0 0 7px 2px #444'
      }
    };

    return (
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={handleProductModalClose}
          style={customStyles}
          contentLabel="Product Details"
        >
          <div className="product-details">
            <div className="close" onClick={handleProductModalClose}>
              x
            </div>
            <h3 className="heading">Product Details</h3>
            <p>
              <strong>Sku Id:</strong>
              <span>{skuId}</span>
            </p>
            <p>
              <strong>Name:</strong>
              <span>{name}</span>
            </p>
            <p>
              <strong>Description:</strong>
              <span>{description}</span>
            </p>
            <p>
              <strong>Price:</strong>
              <span>{price}</span>
            </p>
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <ReviewForm
              showAddReview={showAddReview}
              handleSubmitReview={this.handleSubmitReview}
              toggleReview={this.toggleReview}
              skuId={skuId}
            />
            <ProductReviews reviews={reviews} />
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error
  };
};

export default connect(mapStateToProps)(ProductModal);
