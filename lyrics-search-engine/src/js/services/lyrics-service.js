const lyricsApiUrl = `https://api.lyrics.ovh/v1`;

export function getSongLyrics(author, song) {
  return new Promise((resolve, reject) => {
    return fetch(`${lyricsApiUrl}/${author}/${song}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return new Error("Something went wrong !");
        }
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}
