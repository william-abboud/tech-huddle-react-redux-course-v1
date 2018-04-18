import React, { Component } from 'react';
import LyricsSearchEngine from '../components/LyricsSearchForm';

class HomeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   return <LyricsSearchEngine />;
  }
}

export default HomeView;
