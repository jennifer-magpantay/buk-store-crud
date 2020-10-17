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
  let id = document.querySelector("#id").value;
  let title = document.querySelector("#title").value;
  let year = document.querySelector("#year").value;
  let price = document.querySelector("#price").value;
  let category = document.querySelector("#categoryList").value;

  //then, assing then to another variable as object
  let book = {
    id: id,
    title: title,
    year: year,
    price: price,
    category: category,
  };
  // const uri = document.querySelector("#id").value;
  const url = "http://localhost:3000/books/";
  const options = {
    method: "PUT",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(book),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((book) => console.log(book))
    .catch((error) => {
      console.log("Error");
      // console.error(error);
      alert(error);
    });
}

//ERROR: FETCHING DATA - ???
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
