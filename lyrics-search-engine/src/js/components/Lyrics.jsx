import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

class Lyrics extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      const container = this.container;
      let currentTop = container.scrollY;

      function foo() {
        container.scroll({
          top: currentTop,
          behavior: "smooth"
        });

        if (currentTop < 1000) {
          currentTop += 10;
          requestAnimationFrame(foo);
        }
      }

      requestAnimationFrame(foo);
    }, 1000);
  }

  render() {
    const { song, lyrics } = this.props;
    const style = {
      height: "500px",
      overflowY: "scroll",
    };

    return (
      <div className="jumbotron">
        <h1>{song}</h1>

        <div style={style} ref={(ref) => this.container = ref}>
          {lyrics.split("\n").map(paragraph => {
            return <p>{paragraph}</p>
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ lyrics }) {
  const { song } = queryString.parse(window.location.search);
  const lyricsForSong = lyrics.find(songAndLyrics => {
    return songAndLyrics.song === song;
  });

  if (!lyricsForSong) {
    window.location.pathname = '/';
    return {};
  }

  return lyricsForSong;
}

export default connect(mapStateToProps, null)(Lyrics);
