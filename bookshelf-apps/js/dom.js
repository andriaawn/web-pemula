const INCOMPLETE_BOOKSHELF_LIST = "incompleteBookshelfList";
const COMPLETE_BOOKSHELF_LIST = "completeBookshelfList";

function makeBookList(title, author, year, isCompleted) {
  const textBookTitle = document.createElement("h3");
  textBookTitle.innerText = title;

  const textBookAuthor = document.createElement("p");
  textBookAuthor.innerHTML = "Penulis: <span id='author'>" + author + "</span>";

  const textBookYear = document.createElement("p");
  textBookYear.innerHTML = "Tahun: <span id='year'>" + year + "</span>";

  const classAction = document.createElement("div");
  classAction.classList.add("action");

  if (isCompleted) {
    classAction.append(unfinishedCheckButton(), deleteCheckButton());
  } else {
    classAction.append(finishedCheckButton(), deleteCheckButton());
  }

  const classBookItem = document.createElement("article");
  classBookItem.classList.add("book_item");
  classBookItem.append(textBookTitle, textBookAuthor, textBookYear, classAction);
  

  return classBookItem;
}

function addBook() {
  const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELF_LIST);
  const completeBookshelfList = document.getElementById(COMPLETE_BOOKSHELF_LIST);

  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const isCompleted = document.getElementById("inputBookIsComplete").checked;

  if (!isCompleted) {
    const book = makeBookList(bookTitle, bookAuthor, bookYear);
    incompleteBookshelfList.append(book);
  } else {
    const newBook = makeBookList(bookTitle, bookAuthor, bookYear, true);
    completeBookshelfList.append(newBook);
  }
}

function finishedReadingButton(green, eventListener) {
  const finishedReading = document.createElement("button");
  finishedReading.classList.add(green);
  finishedReading.innerText = "Selesai dibaca";

  finishedReading.addEventListener("click", function (event) {
    eventListener(event);
  });

  return finishedReading;
}

function unfinishedReadingButton(green, eventListener) {
  const unfinishedReading = document.createElement("button");
  unfinishedReading.classList.add(green);
  unfinishedReading.innerText = "Belum Selesai dibaca";

  unfinishedReading.addEventListener("click", function (event) {
    eventListener(event);
  });

  return unfinishedReading;
}

function deleteBookButton(red, eventListener) {
  const deleteBook = document.createElement("button");
  deleteBook.classList.add(red);
  deleteBook.innerText = "Hapus buku";

  deleteBook.addEventListener("click", function (event) {
    eventListener(event);
  });

  return deleteBook;
}


function addBookToCompleted(bookElement) {
  const addBookTitle = bookElement.querySelector("h3").innerText;
  const addBookAuthor = bookElement.querySelector("span#author").innerText;
  const addBookYear = bookElement.querySelector("span#year").innerText;

  const newBook = makeBookList(addBookTitle, addBookAuthor, addBookYear, true);
  const completeBookshelfList = document.getElementById(COMPLETE_BOOKSHELF_LIST);
  completeBookshelfList.append(newBook);

  bookElement.remove();
}

function finishedCheckButton() {
  return finishedReadingButton("green", function (event) {
    addBookToCompleted(event.target.parentElement.parentElement);
  });
}

function unfinishedCheckButton() {
    return unfinishedReadingButton("green", function (event) {
      undoBookFromCompleted(event.target.parentElement.parentElement);
    });
}

function deleteCheckButton() {
  return deleteBookButton("red", function (event) {
    removeBookFromCompleted(event.target.parentElement.parentElement);
  });
}

function removeBookFromCompleted(bookElement) {
  bookElement.remove();
}

function undoBookFromCompleted(bookElement) {
  const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELF_LIST);

  const addBookTitle = bookElement.querySelector("h3").innerText;
  const addBookAuthor = bookElement.querySelector("span#author").innerText;
  const addBookYear = bookElement.querySelector("span#year").innerText;

  const newBook = makeBookList(addBookTitle, addBookAuthor, addBookYear, false);

  incompleteBookshelfList.append(newBook);
  bookElement.remove();
}
