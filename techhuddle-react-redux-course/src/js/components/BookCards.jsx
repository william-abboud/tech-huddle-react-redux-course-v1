import React from 'react';
import { string, number, array, oneOf } from 'prop-types';

class BookCards extends React.Component {
  constructor(props) {
    super(props);

    this.loadBooks = this.loadBooks.bind(this);

    this.state = {
      books: [],
      booksToBeLoaded: [],
      error: false,
    };
  }

  static defaultProps() {
    return {
      books: [],
      lazyLoadedBooks: []
    };
  }

  componentDidMount() {
    if (Array.isArray(this.props.books) && this.props.books.length) {
      this.loadBooks(this.props.books);
    }
  }

  componentWillReceiveProps({ lazyLoadedBooks }) {
    this.setState({ booksToBeLoaded: lazyLoadedBooks });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.booksToBeLoaded.length !== this.state.booksToBeLoaded.length) {
      this.loadBooks(this.state.booksToBeLoaded)
        .then(() => this.setState({ booksToBeLoaded: [] }));
    }
  }

  loadBooks(books) {
    const getBook = (isbn) => {
      return fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
    };

    return Promise.all(books.map(book => getBook(book.isbn)))
      .then(responses => {
        const safeResponses = responses.filter(r => r.ok);

        return Promise.all(safeResponses.map(r => r.json()));
      })
      .then(books => books.map(book => {
        const isbn = Object.keys(book)[0];

        return book[isbn];
      }))
      .then(books => this.setState({ books: [...this.state.books, ...books] }))
      .catch(e => this.setState({ error: true }));
  }

  render() {
    const { books, error } = this.state;

    if (error) {
      return <div className="error">Something went totally bust</div>;
    }

    if (!books.filter(book => book).length) {
      return null;
    }

    return (
      <div className="book-cards">
        {
          books.map((book, i) => (
            <Book
              key={book.title}
              title={book.title}
              authors={book.authors}
              pagesCount={book.number_of_pages}
              publishDate={book.publish_date}
              cover={book.cover.large}
            />
          ))
        }
      </div>
    );
  }
}

BookCards.propTypes = {
  books: array
};

/*
{
  title = "Untitled",
  authors = [],
  publishDate = "",
  pagesCount = 0,
  cover = "/placeholder.jpg"
}
*/
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

Book.propTypes = {
  title: string.isRequired,
  publishDate: string.isRequired
};

export default BookCards;
