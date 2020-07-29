import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default class ReviewForm extends React.Component {
  state = {
    title: '',
    comment: '',
    errorMsg: ''
  };

  handleSubmitReview = (event) => {
    event.preventDefault();
    const { skuId } = this.props;
    const { title, comment } = this.state;

    if (title.trim() !== '' && comment.trim() !== '') {
      this.props
        .handleSubmitReview(skuId, {
          title,
          comment
        })
        .then((response) => {
          if (response) {
            this.setState({
              title: '',
              comment: '',
              errorMsg: ''
            });
          }
        });
    } else {
      this.setState({ errorMsg: 'Please enter all the fields.' });
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { showAddReview, toggleReview } = this.props;
    const { title, comment, errorMsg } = this.state;

    return (
      <React.Fragment>
        <Button
          variant="secondary"
          type="submit"
          size="sm"
          onClick={toggleReview}
        >
          {showAddReview ? 'Hide add review' : 'Add a review'}
        </Button>
        {errorMsg !== '' && <p className="errorMsg">{errorMsg}</p>}
        <div className={`add-review ${showAddReview ? '' : 'hide'}`}>
          <Form onSubmit={this.handleSubmitReview}>
            <Form.Group controlId="review_title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                placeholder="Enter title for your review"
                onChange={this.handleInputChange}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group controlId="review_comment">
              <Form.Label>Write your review</Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                value={comment}
                rows="3"
                placeholder="Enter your review"
                onChange={this.handleInputChange}
                autoComplete="off"
              />
            </Form.Group>
            <Button variant="secondary" type="submit" size="sm">
              Publish
            </Button>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}
