document.addEventListener("DOMContentLoaded", function () {
  const bookSubmit = document.getElementById("inputBook");

  bookSubmit.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
});

