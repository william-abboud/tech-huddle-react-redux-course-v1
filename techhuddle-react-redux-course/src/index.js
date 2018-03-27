import './main.scss';
import "babel-polyfill";
import "whatwg-fetch";
import React from 'react';
import ReactDOM from 'react-dom';
import BookCards from './js/components/BookCards';
import booksData from './assets/books-data.json';

const superman = {
  title: "Superman",
  isbn: "0785339434"
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
    this.state = {
      books: booksData,
      booksForLater: []
    };
  }

  loadMore() {
    this.setState({
      booksForLater: [superman]
    });
  }

  render() {
    return (
      <div>
        <BookCards books={this.state.books} lazyLoadedBooks={this.state.booksForLater} />
        <button onClick={this.loadMore}>Load more</button>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
