function getBooks() {
  console.log("Loading page");
  //first: add a function to display the hidden table
  displayTable();
  getAllBooks();
}

function displayTable() {
  var showTable = document.querySelector("#table");
  if (showTable.style.display === "none") {
    showTable.style.display = "block";
  } else {
    showTable.style.display = "none";
  }
  console.log("Displaying table");
}

function getAllBooks() {
  //replacing localhost url by heroku application url
  const url = "http://localhost:3000/books";
  //getting request by fecth
  fetch(url)
    .then((response) => {
      console.log(response);
      return response.json(); //it will returns the data into json/array format
      //ps: return response.text(); //will returns the data into txt format
    })
    .then((data) => {
      console.log(data);
      //read the each item of the data usinf for of loop
      let table = "";
      for (const book of data.books) {
        table +=
          "<tr>" +
          "<th>" +
          book.id +
          "</th>" +
          "<th>" +
          book.title +
          "</th>" +
          "<th>" +
          book.year +
          "</th>" +
          "<th>" +
          book.price +
          "</th>" +
          "<th>" +
          book.category +
          "</th>" +
          "</tr>";
      }
      var x = document.querySelector("#tBody");
      x.innerHTML = table;
    })
    .catch((error) => {
      console.log("Error");
      console.error(error);
    });
}
