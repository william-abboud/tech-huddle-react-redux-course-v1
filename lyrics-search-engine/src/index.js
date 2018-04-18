import './main.scss';
import "babel-polyfill";
import "whatwg-fetch";
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeView from './js/views/HomeView';
import LyricsView from './js/views/LyricsView';
import Header from './js/common/Header';
import lyricsReducer from './js/reducers/lyrics-reducer';

const AppState = {
  lyrics: lyricsReducer
};

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(combineReducers(AppState),applyMiddleware(middleware));

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Header />

            <Route path="/" component={HomeView} exact />
            <Route path="/lyrics" component={LyricsView} exact />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
