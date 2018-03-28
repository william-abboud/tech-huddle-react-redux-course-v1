import './main.scss';
import "babel-polyfill";
import "whatwg-fetch";
import React from 'react';
import ReactDOM from 'react-dom';
import HomeView from './js/views/HomeView';
import BooksView from './js/views/BooksView';
import RegisterView from './js/views/RegisterView';
import Header from './js/common/Header';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
