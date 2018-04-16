import './main.scss';
import "babel-polyfill";
import "whatwg-fetch";
import React from 'react';
import ReactDOM from 'react-dom';
import { string } from 'prop-types';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeView from './js/views/HomeView';
import BooksView from './js/views/BooksView';
import RegisterView from './js/views/RegisterView';
import StarWarsView from './js/views/StarWarsView';
import Header from './js/common/Header';
import mainState from './js/reducers/main-reducer';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(combineReducers(mainState),applyMiddleware(middleware));

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      theme: "light"
    };
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Header />

            <Route path="/" component={HomeView} exact />
            <Route path="/books" component={BooksView} />
            <Route path="/register" component={RegisterView} />
            <Route path="/star-wars" component={StarWarsView} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

App.childContextTypes = {
  theme: string
};

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
