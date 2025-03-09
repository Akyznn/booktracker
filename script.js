const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
const sortSelect = document.getElementById("sort");
const searchInput = document.getElementById("search");
let books = JSON.parse(localStorage.getItem("books")) || [];

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const pages = document.getElementById("pages").value;
  const type = document.getElementById("type").value;
  const status = document.getElementById("status").value;
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value;
  const date = new Date().toLocaleDateString("fr-FR");

  const book = { title, pages, type, status, rating, comment, date };
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  bookForm.reset();
  displayBooks();
});

sortSelect.addEventListener("change", displayBooks);
searchInput.addEventListener("input", displayBooks);

function displayBooks() {
  bookList.innerHTML = "";
  let filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
    book.comment.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  
  let sortedBooks = [...filteredBooks];
  const sortBy = sortSelect.value;
  if (sortBy === "date") sortedBooks.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (sortBy === "type") sortedBooks.sort((a, b) => a.type.localeCompare(b.type));
  if (sortBy === "note") sortedBooks.sort((a, b) => b.rating - a.rating);
  if (sortBy === "status") sortedBooks.sort((a, b) => a.status.localeCompare(b.status));
  
  sortedBooks.forEach((book, index) => {
    const li = document.createElement("li");
    li.className = "p-4 bg-gray-50 rounded-lg shadow-md";
    li.innerHTML = `<strong>${book.title}</strong> - ${book.type} - ${book.pages} pages - ${book.status} - ${book.rating}/10 - ${book.date} 
                    <button onclick="toggleComment(${index})" class="ml-2 text-blue-500">+</button>
                    <p id="comment-${index}" class="hidden mt-2 text-gray-600">${book.comment}</p>`;
    bookList.appendChild(li);
  });
}

function toggleComment(index) {
  document.getElementById(`comment-${index}`).classList.toggle("hidden");
}

displayBooks();
