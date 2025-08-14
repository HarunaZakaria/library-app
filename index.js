const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // unique id
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype function to toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Add book to library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Display books
function displayBooks() {
  const library = document.getElementById('library');
  library.innerHTML = ''; // clear before re-adding

  myLibrary.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? '✅ Read' : '❌ Not Read'}</p>
      <button data-id="${book.id}" class="toggleBtn">Toggle Read</button>
      <button data-id="${book.id}" class="removeBtn">Remove</button>
    `;
    library.appendChild(bookCard);
  });

  // Add event listeners for toggle & remove buttons
  document.querySelectorAll('.toggleBtn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const book = myLibrary.find((b) => b.id === e.target.dataset.id);
      book.toggleRead();
      displayBooks();
    });
  });

  document.querySelectorAll('.removeBtn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = myLibrary.findIndex((b) => b.id === e.target.dataset.id);
      myLibrary.splice(index, 1);
      displayBooks();
    });
  });
}

const newBookBtn = document.getElementById('newBookBtn');
const bookForm = document.getElementById('bookForm');

newBookBtn.addEventListener('click', () => {
  bookForm.style.display = bookForm.style.display === 'none' ? 'block' : 'none';
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault(); // stop form from refreshing page
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);

  bookForm.reset();
  bookForm.style.display = 'none';
});
