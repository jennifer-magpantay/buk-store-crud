function deleteBook() {
  //display hide form
  console.log("Loading page");
  displayDeleteForm();
}

function displayDeleteForm() {
  var x = document.querySelector("#deleteBook");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function deleteBookID() {
  //create var for input
  var uri = document.querySelector("#deleteID").value;
  //replacing localhost url by heroku application url
  const url = "http://localhost:3000/books/";
  var options = {
    method: "DELETE",
  };
  fetch(url + uri, options)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((book) => {
      console.log(book);
    });
}
