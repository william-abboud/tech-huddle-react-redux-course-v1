const serviceUrl = "https://openlibrary.org/api/books?bibkeys=ISBN"
const bookUrl = (isbn) => `${serviceUrl}:${isbn}&format=json&jscmd=data`;

export function getBook(isbn) {
  const bookPromise = new Promise((resolve, reject) => {
    return fetch(bookUrl(isbn))
      .then(res => res.json())
      .then(book => book[`ISBN:${isbn}`])
      .then(book => resolve(book))
      .catch(error => reject(error));
  });

  return bookPromise;
}

export function getBooks(isbns) {
  const booksPromise = new Promise((resolve, reject) => {
    return Promise.all(isbns.map(getBook))
      .then(books => resolve(books))
      .catch(error => reject(error));
  });

  return booksPromise;
}
