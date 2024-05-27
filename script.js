const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const library = document.getElementById('library');
  library.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('card');

    bookCard.innerHTML = `
      <h2 class="title">${book.title}</h2>
      <p class="author">${book.author}</p>
      <p class="pages">${book.pages} pages</p>
      <p class="read">${book.read ? 'Read' : 'Not Read yet'}</p>
      <button onclick="toggleReadStatus(${index})">${book.read ? 'Mark as Not Read' : 'Mark as Read'}</button>
      <button onclick="removeBook(${index})">Remove</button>
    `;

    library.appendChild(bookCard);
  });
}

function toggleReadStatus(index) {
  myLibrary[index].toggleRead();
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

document.getElementById('new-book-btn').addEventListener('click', () => {
  document.getElementById('new-book-dialog').showModal();
});

document.getElementById('cancel-btn').addEventListener('click', () => {
  document.getElementById('new-book-dialog').close();
});

document.getElementById('new-book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  document.getElementById('new-book-dialog').close();
  e.target.reset();
});

// Example 
addBookToLibrary('The Naked Face', 'Sydney Sheldon', 320, true);

displayBooks();
