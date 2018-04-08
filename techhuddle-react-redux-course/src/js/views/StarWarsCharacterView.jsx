import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { searchCharacter } from '../services/star-wars-service';

function CharacterResult({ character, path }) {
  const safeUrlName = character.name.split(" ").join("-");
  return (
    <div>
      <Link to={`${path}/${safeUrlName}`}>{character.name}</Link>
    </div>
  );
}

class StarWarsCharacterView extends Component {
  constructor(props) {
    super(props);

    this.getCharacter = this.getCharacter.bind(this);

    this.state = {
      searchResults: []
    };
  }

  getCharacter(name) {
    return searchCharacter(name)
      .then(results => this.setState({ searchResults: results }))
      .catch(error => console.error(error));
  }

  componentDidMount() {
    const params = queryString.parse(window.location.search);

    // if you put 2 exclamation marks you are fine (it will work tho) ;)
    if (!!params.name) {
      this.getCharacter(params.name);
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <h1>Info:</h1>

        {
          this.state.searchResults.map(result =>
            <CharacterResult
              key={result.name}
              character={result}
              path={this.props.match.path}
            />
          )
        }
      </div>
    );
  }
}

export default StarWarsCharacterView;
