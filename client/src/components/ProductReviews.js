import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Review from './Review';
import { initiateDeleteReview } from '../actions/reviews';

class ProductReviews extends React.Component {
  handleDeleteReview = (id) => {
    this.props.dispatch(initiateDeleteReview(id));
  };

  render() {
    let { reviews } = this.props;

    if (reviews) {
      reviews = reviews.list;

      return (
        <div className="reviews">
          <h4 className="title">Reviews</h4>
          {!_.isEmpty(reviews) ? (
            reviews.map((review) => (
              <Review
                key={review._id}
                {...review}
                handleDeleteReview={this.handleDeleteReview}
              />
            ))
          ) : (
            <p>No reviews added. Be the first one to add review.</p>
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect()(ProductReviews);
