//fetch reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//fetch tutorial reference: https://www.youtube.com/watch?v=Kw5tC5nQMRY&t=689s
//2.3 HTTP Post Request with fetch() - Working with Data and APIs in JavaScript

//first display the form when add button is clicked
//then, post request when submit button is clicked

function add(){

    //function to display the hidden form to add new titles
    //it is working with double click at the first time - WHY???
    var x = document.querySelector("#newTitles");
    if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//function of the submit button of the form
function addPost(){

  //once the form is filled with the information the submit button will post all them 
  //by fetching
 
  //create a a variable to get value from the form
  //var book = document.querySelector("#newTitles").value; //getting data from the form
  var title = document.querySelector("#title").value;
  var year = document.querySelector("#year").value;
  var price = document.querySelector("#price").value;
  var category = document.querySelector("#categoryList").value;

  var book = { title: title, year: year, price: price, category: category }

  //replacing localhost url by heroku application url
  var url = "https://warm-island-20847.herokuapp.com/books";
  var options = {
    method:'POST',
    cache: 'no-cache', 
    credentials: 'include', 
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      },
    body:JSON.stringify(book)
    }

  fetch(url, options)
  .then(response  => {
    console.log(response);
    return response.json(); //it will returns the data into json/array format
    //return response.text(); //will returns the data into txt format
    })
    .then(book  => { //.then(data => ...) or any other name
      console.log(book);   //getting undefined error!

    })
  
  }



  //content.innerHTML = "testing";  

    