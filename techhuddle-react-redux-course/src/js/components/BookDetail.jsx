import React, { Component } from 'react';
import { getBook } from '../services/books-service';

class BookDetail extends Component {
  constructor(props) {
    super(props);

    this.loadBook = this.loadBook.bind(this);

    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    this.loadBook(this.props.match.params.isbn);
  }

  loadBook(isbn) {
    return getBook(isbn)
      .then(book => this.setState({ book }))
      .catch(err => console.error(error));
  }

  render() {
    const { book } = this.state;

    if (!book.title) {
      return null;
    }

     return (
      <div className="book-detail">
        <h2>Title: {book.title}</h2>
        <h4>Authors: {book.authors.map(author => author.name)}</h4>
        <img src={book.cover.large} alt=""/>
        <br />
        ...
      </div>
    );
  }
}

export default BookDetail;
