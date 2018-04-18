import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { getSongLyrics } from '../services/lyrics-service';
import { loadLyricsActionCreator } from '../actions/action-creators';

class LyricsSearchEngine extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.displayResults = this.displayResults.bind(this);

    this.state = {
      author: "",
      song: "",
      lyricsLoaded: false,
    };
  }

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value
    });
  }

  displayResults(e) {
    e.preventDefault();
    const { song, author } = this.state;

    getSongLyrics(author, song)
      .then((data) => this.props.saveLyrics(song, data.lyrics))
      .then(() => this.setState({ lyricsLoaded: true }))
      .catch(error => console.error(error));
  }

  render() {
    const { song, author, lyrics, lyricsLoaded } = this.state;

    if (lyricsLoaded) {
      return <Redirect to={`/lyrics?song=${song}`} />;
    }

    return (
      <section className="home-view container">
        <div className="row justify-center">
          <div className="col-12">
            <form onSubmit={this.displayResults}>
              <div className="form-group">
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={this.handleChange}
                  required
                />
                <input
                  type="text"
                  id="song"
                  value={song}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <button className="btn btn-primary">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveLyrics(songName, lyrics) {
      const action = loadLyricsActionCreator(songName, lyrics);

      dispatch(action);
    }
  };
}

export default connect(null, mapDispatchToProps)(LyricsSearchEngine);;
