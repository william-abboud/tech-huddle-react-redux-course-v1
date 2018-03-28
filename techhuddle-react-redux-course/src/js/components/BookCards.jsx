import React from 'react';
import { string, number, array, oneOf } from 'prop-types';
import { getBook, getBooks } from '../services/books-service';
import booksData from '../../assets/books-data.json';

class BookCards extends React.Component {
  constructor(props) {
    super(props);

    this.loadBooks = this.loadBooks.bind(this);

    this.state = {
      books: [],
      error: false,
    };
  }

  static defaultProps() {
    return {
      books: [],
    };
  }

  componentDidMount() {
    this.loadBooks(booksData.map(book => book.isbn));
  }

  componentWillReceiveProps() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  loadBooks(isbns) {
    return getBooks(isbns)
      .then(books => this.setState({ books }))
      .catch(e => this.setState({ error: true }));
  }

  render() {
    const { books, error } = this.state;

    if (error) {
      return <div className="error">Something went totally bust !!!</div>;
    }

    if (!books.filter(book => book).length) {
      return null;
    }

    return (
      <div className="book-cards">
        {
          books.map(book => (
            <Book
              key={book.title}
              title={book.title}
              authors={book.authors}
              pagesCount={book.number_of_pages}
              publishDate={book.publish_date}
              cover={book.cover.large}
              isbn={book.identifiers.isbn_10}
            />
          ))
        }
      </div>
    );
  }
}

function Book(props) {
  return (
    <div className="book-card">
      <h2 className="title">{props.title}</h2>
      <h3 className="authors-heading">Authors</h3>
      <ul>
        { props.authors.map(author => <li className="author">{author.name}</li>) }
      </ul>
      <h4 className="published-date">Date: {props.publishDate}</h4>
      <div className="pages-count">Pages: {props.pagesCount}</div>
      <img src={props.cover} className="cover" />
    </div>
  );
}

Book.defaultProps = {
  title: "Untitled",
  authors: [],
  publishDate: "",
  pagesCount: 0,
  cover: "/placeholder.jpg",
};

Book.propTypes = {
  title: string.isRequired,
  publishDate: string.isRequired
};

export default BookCards;
