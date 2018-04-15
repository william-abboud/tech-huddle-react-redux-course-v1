import './main.scss';
import "babel-polyfill";
import "whatwg-fetch";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeView from './js/views/HomeView';
import BooksView from './js/views/BooksView';
import RegisterView from './js/views/RegisterView';
import StarWarsView from './js/views/StarWarsView';
import Header from './js/common/Header';
import Store from './js/store/store';

window.Store = Store;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Header />

          <Route path="/" component={HomeView} exact />
          <Route path="/books" component={BooksView} />
          <Route path="/register" component={RegisterView} />
          <Route path="/star-wars" component={StarWarsView} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
