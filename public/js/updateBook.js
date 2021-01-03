function updateBook() {
  console.log("Loading page");
  displayUpdateForm();
}

function displayUpdateForm() {
  //display hide form
  var x = document.querySelector("#updateBook");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function updateBookData() {
  const id = document.querySelector("#id").value;
  const title = document.querySelector("#title").value;
  const year = document.querySelector("#year").value;
  const price = document.querySelector("#price").value;
  const category = document.querySelector("#categoryList").value;

  //then, assing then to another variable as object
  const book = { id: id, title: title, year: year, price: price, category: category };

  // const uri = document.querySelector("#id").value;
  const url = "http://localhost:3000/books/";
  const options = {
    method: "PUT",
    cache: "no-cache",
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify(book),
  };
  // fetch(url + uri, options)
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

//ERROR: FETCHING DATA - ??? //POSTMAN WORKING PERFECTLY!!!
// preventEventDefault();
// prevent default seems not working - WHY KEEPS RELOADING THE PAGE??
//prevent the page to reload once submit is pressed
function preventEventDefault() {
  const form = document.querySelector("#updateBook");
  form.addEventListener("submit", function (event) {
    clearInput();
    event.preventDefault();
  });
}
//clear spaces after submit
function clearInput() {
  const cleanForm = (document.querySelector("#updateBook").value = "");
  cleanForm.focus();
}
