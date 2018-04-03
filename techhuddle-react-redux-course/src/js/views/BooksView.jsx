import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BookCards from '../components/BookCards';
import BookDetail from '../components/BookDetail';
import booksData from '../../assets/books-data.json';

class BooksView extends Component {
  constructor(props) {
    super(props);

    this.loadNewBook = this.loadNewBook.bind(this);

    this.state = {
      books: booksData
    };

  }

  componentDidMount() {
    this.loadNewBook();
  }

  componentWillUnmount() {
    console.log("bye bye");

    clearTimeout(this.timeoutId);
  }

  loadNewBook() {
    const newBook = {
      "title": "Lord of the Rings the Two Towers",
      "isbn": "0618260277"
    };

    this.timeoutId = setTimeout(() => {
      this.setState((prevState, prevProps) => ({
        books: [...prevState.books, newBook]
      }));
    }, 5000);
  }

  render() {
    return (
      <section className="books-view">
        <h2>Books page</h2>
        { /* <Route path={this.props.match.path} component={BookCards} exact /> */}
        <BookCards books={this.state.books} />
        <Route path={`${this.props.match.path}/:isbn`} component={BookDetail} />
      </section>
    );
  }
}

export default BooksView;
