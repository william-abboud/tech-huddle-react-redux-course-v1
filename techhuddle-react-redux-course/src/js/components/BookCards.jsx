import React from 'react';
import { Link } from "react-router-dom";
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
    this.loadBooks(this.props.books.map(book => book.isbn));
  }

  componentWillReceiveProps(nextProps) {
    const currentBooks = this.props.books;
    const nextBooks = nextProps.books;

    const newBooks = nextBooks.filter(book =>
       !currentBooks.find(cb => cb.isbn === book.isbn)
    );

    this.loadBooks(newBooks.map(book => book.isbn), false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentBooks = this.props.books.map(book => JSON.stringify(book));
    const nextBooks = nextProps.books.map(book => JSON.stringify(book));

    const currentBooksInState = this.state.books.map(book => JSON.stringify(book));
    const nextBooksInState = nextState.books.map(book => JSON.stringify(book));

    if (JSON.stringify(currentBooks) === JSON.stringify(nextBooks) &&
      JSON.stringify(currentBooksInState) === JSON.stringify(nextBooksInState)
    ) {
      return false;
    }

    return true;
  }

  loadBooks(isbns, overwrite = true) {
    return getBooks(isbns)
      .then(books => {
        this.setState({
          books: overwrite ? books : [...this.state.books, ...books]
        });
      })
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
              match={{ path: "books" }}
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
      <h2 className="title"><Link to={`${props.match.path}/${props.isbn}`}>{props.title}</Link></h2>
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
