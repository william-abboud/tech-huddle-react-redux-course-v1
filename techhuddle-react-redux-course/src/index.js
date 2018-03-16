import './main.scss';
import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import ArtistCard from './js/components/ArtistCard';
import data from './assets/data.json';
import eminem from './assets/images/eminem-profile.jpg';

const artist = data[0];

ReactDOM.render(
  <ArtistCard artist={artist} />
  ,document.getElementById("root")
);
