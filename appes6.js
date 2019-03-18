// class Book


class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// ui class

class UI {
  addBookToList(book) {
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

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  showAlert(message, type) {
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

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}

// local storage class

class Store {

  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book) {
      const ui = new UI;
      ui.addBookToList(book);

    })
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    console.log(isbn);
    const books = Store.getBooks();
    console.log(books);
    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    })
    localStorage.setItem("books", JSON.stringify(books));
  }

}

// DOM load event

document.addEventListener("DOMContentLoaded", Store.displayBooks);


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

    // add book to list and LS

    ui.addBookToList(book);
    Store.addBook(book);

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

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
})