const INCOMPLETE_BOOKSHELF_LIST = "incompleteBookshelfList";
const COMPLETE_BOOKSHELF_LIST = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function makeBookList(title, author, year, isComplete) {
  const textBookTitle = document.createElement("h3");
  textBookTitle.innerText = title;

  const textBookAuthor = document.createElement("p");
  textBookAuthor.innerHTML = "Penulis: <span id='author'>" + author + "</span>";

  const textBookYear = document.createElement("p");
  textBookYear.innerHTML = "Tahun: <span id='year'>" + year + "</span>";

  const classAction = document.createElement("div");
  classAction.classList.add("action");

  if (isComplete) {
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
  const isComplete = document.getElementById("inputBookIsComplete").checked;


  if (!isComplete) {
    const book = makeBookList(bookTitle, bookAuthor, bookYear);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, false);
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    incompleteBookshelfList.append(book);
  } else {
    const newBook = makeBookList(bookTitle, bookAuthor, bookYear, true);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, false);
    newBook[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);
    completeBookshelfList.append(newBook);
  }

  updateDataToStorage();
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
  const completeBookshelfList = document.getElementById(COMPLETE_BOOKSHELF_LIST);
  const addBookTitle = bookElement.querySelector("h3").innerText;
  const addBookAuthor = bookElement.querySelector("span#author").innerText;
  const addBookYear = bookElement.querySelector("span#year").innerText;

  const newBook = makeBookList(addBookTitle, addBookAuthor, addBookYear, true);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isComplete = true;
  newBook[BOOK_ITEMID] = book.id;

  completeBookshelfList.append(newBook);

  bookElement.remove();

  updateDataToStorage();
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
    alert("Data buku akan dihapus!")
    removeBookFromCompleted(event.target.parentElement.parentElement);
  });
}

function removeBookFromCompleted(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  bookElement.remove();
  updateDataToStorage();
}

function undoBookFromCompleted(bookElement) {
  const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELF_LIST);

  const addBookTitle = bookElement.querySelector("h3").innerText;
  const addBookAuthor = bookElement.querySelector("span#author").innerText;
  const addBookYear = bookElement.querySelector("span#year").innerText;

  const newBook = makeBookList(addBookTitle, addBookAuthor, addBookYear, false);

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isComplete = false;
  newBook[BOOK_ITEMID] = book.id;

  incompleteBookshelfList.append(newBook);
  bookElement.remove();

  updateDataToStorage();
}

function refreshDataFromBooks() {
  const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELF_LIST);
  let completeBookshelfList = document.getElementById(COMPLETE_BOOKSHELF_LIST);

  for (book of books) {
    const newBook = makeBookList(book.title, book.author, book.year, book.isComplete);
    newBook[BOOK_ITEMID] = book.id;

    if (book.isComplete) {
      completeBookshelfList.append(newBook);
    } else {
      incompleteBookshelfList.append(newBook);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const searchBook = document.getElementById("searchBook");

  searchBook.addEventListener("submit", function (event) {
    event.preventDefault();
    
    var valueSearch, title, book_item, i;

    valueSearch = document.getElementById("searchBookTitle").value.toUpperCase();
    book_item = document.getElementsByClassName("book_item");

    for (i = 0; i < book_item.length; i++) {
      title = book_item[i].getElementsByTagName("h3");
      if (title[0].innerHTML.toUpperCase().indexOf(valueSearch) > -1) {
        book_item[i].style.display = "";
      } else {
        book_item[i].style.display = "none";
      }
    }
  });
});
