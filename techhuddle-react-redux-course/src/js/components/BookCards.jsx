import React from 'react';
import { string, number, array, oneOf } from 'prop-types';

const books = {
  "The adventures of Tom Sawyer": {
    isbn: "0451526538",
  },
  "Tom Sawyer abroad": {
    isbn: "0451519612",
  },
  "Leonardo": {
    isbn: "0517249529",
  }
};

let counter = 0;

class BookCards extends React.Component {
  constructor(props) {
    super(props);

    this.loadBook = this.loadBook.bind(this);

    this.state = {
      books: [],
    };
  }

  loadBook(event) {
    const { titles } = this.props;
    const { isbn } = books[titles[counter]];
    const getBook = (isbn) => {
      return fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
    };

    getBook(isbn)
      .then(response => response.json())
      .then(book => this.setState({
        books: [...this.state.books, book[`ISBN:${isbn}`]],
      }))
      .then(() => counter++)
      .catch(error => console.error(error));
  }

  render() {
    const { books } = this.state;
    const buttonText = books.length ? "Load more books" : "Load Book";

    return (
      <div className="book-cards">
        Here are some book cards

        <hr/>

        {
          books.map((book, i) => <h1 key={i}>{book.title}</h1>)
        }

        <button onClick={this.loadBook}>{buttonText}</button>
      </div>
    );
  }
}

BookCards.propTypes = {
  titles: array.isRequired,
};

function Book(props) {
  return null;
}

Book.propTypes = {
  title: string.isRequired,
  publishDate: oneOf([number, string]).isRequired
};

export default BookCards;
