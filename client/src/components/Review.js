import React from 'react';
import moment from 'moment';

export default class Review extends React.Component {
  handleDeleteReview = (event) => {
    event.preventDefault();
    this.props.handleDeleteReview(this.props._id);
  };

  render() {
    const { title, comment, updatedAt } = this.props;

    return (
      <div className="review">
        <div className="updated_time">
          <div>{moment(+updatedAt).format('dddd, MMMM Do, YYYY h:mma')}</div>
          <div className="delete-review">
            <a href="/#" onClick={this.handleDeleteReview}>
              Delete
            </a>
          </div>
        </div>
        <div className="main-section">
          <p className="title">{title}</p>
          <p>{comment}</p>
        </div>
      </div>
    );
  }
}
