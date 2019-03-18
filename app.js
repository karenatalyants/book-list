// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}




// UI constructor

function UI() {

}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  // create a tr element
  const row = document.createElement("tr");

  // insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
}


// clearing fields on demand
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
}


// showing the alert
UI.prototype.showAlert = function(message, type) {
  // create an element
  const div = document.createElement("div");
  div.className = `alert ${type}`

  // add text
  div.appendChild(document.createTextNode(message));
  // get  the parent

  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(div, form);

  // timeout after 3 seconds
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 2000);
}

// deleting a book (selecting the element)

UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
}

// event listeners

document.getElementById("book-form").addEventListener("submit", function(e) {

  // get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // work with UI via its object starting from here
  const ui = new UI();

  // validate
  if (title === "" || author === "" || isbn === "") {

    // error alert
    ui.showAlert("Please fill all the fields", "error");

  } else {
    // creating an instance of book
    const book = new Book(title, author, isbn);

    // add book to list

    ui.addBookToList(book);
    ui.showAlert("Book added", "success");

    // clear fields

    ui.clearFields();
  }



  e.preventDefault();
})


// event listener for delete

document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);
  ui.showAlert("Book removed", "success");


  e.preventDefault();
})