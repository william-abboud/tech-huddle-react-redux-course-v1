import React from 'react';

function Album({ year, name }) {
  return <li>{year}: {name}</li>;
}

function ArtistCard({ artist }) {
  return (
    <div className="artist-card">
      <h4>{artist.artist}</h4>
      <img src={artist.photo} alt="artist" />
      <ul>
        {
          artist.aliases.map((alias, i) => {
            return <li key={alias}>{alias}</li>
          })
        }
      </ul>
      <ul>
        {
          artist.albums.map(album =>
            <Album
              key={album.name + album.year}
              year={album.year}
              name={album.name}
            />
          )
        }
      </ul>
    </div>
  );
}

export default ArtistCard;
