function addBook() {
  console.log("Loading page");
  //first: add a function to display the hidden form
  displayPostForm();
}

function displayPostForm() {
  var x = document.querySelector("#addBook");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function addNewBook() {
  // once the form is filled with the information the submit button will post all them by fetching
  // for that, lets create a a variable to get value from the each input field form
  const title = document.querySelector("#title").value;
  const year = document.querySelector("#year").value;
  const price = document.querySelector("#price").value;
  const category = document.querySelector("#categoryList").value;
  //then, assing then to another variable as object
  const book = { title: title, year: year, price: price, category: category };
  //replacing localhost url by heroku application url
  const url = "http://localhost:3000/books/";
  const options = {
    method: "POST",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify(book),
  };
  fetch(url, options)
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((book) => {
      console.log(book);
    })
    .catch((error) => {
      console.log("Error");
      console.error(error);
    });
}

// preventEventDefault();
// prevent default seems not working - WHY KEEPS RELOADING THE PAGE??
//prevent the page to reload once submit is pressed
function preventEventDefault() {
  const form = document.querySelector("#addBook");
  form.addEventListener("submit", function (event) {
    clearInput();
    event.preventDefault();
  });
}
//clear spaces after submit
function clearInput() {
  const cleanForm = (document.querySelector("#addBook").value = "");
  cleanForm.focus();
}
