const serviceUrl = "https://swapi.co/api"
const peopleUrl = `${serviceUrl}/people`;
const peopleSearchUrl = (searchable) => `${peopleUrl}/?search=${searchable}`;

export function getPerson(id) {
  const personPromise = new Promise((resolve, reject) => {
    return fetch(peopleUrl(id))
      .then(res => res.json())
      .then(person => resolve(person))
      .catch(error => reject(error));
  });

  return personPromise;
}

export function searchCharacter(character) {
  const searchCharacterPromise = new Promise((resolve, reject) => {
    return fetch(peopleSearchUrl(character))
      .then(res => res.json())
      .then(characters => resolve(characters.results))
      .catch(error => reject(error));
  });

  return searchCharacterPromise;
}
