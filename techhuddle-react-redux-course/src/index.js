import './main.scss';
import "babel-polyfill";
import "whatwg-fetch";
import React from 'react';
import ReactDOM from 'react-dom';
import data from './assets/data.json';
import eminem from './assets/images/eminem-profile.jpg';
import BookCards from './js/components/BookCards';

const artist = data[0];

const titles = ["The adventures of Tom Sawyer", "Tom Sawyer abroad"];

ReactDOM.render(
  <BookCards titles={titles} />
  ,document.getElementById("root")
);
