//fetch reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//fetch tutorial reference: https://www.youtube.com/watch?v=Kw5tC5nQMRY&t=689s
//2.3 HTTP Post Request with fetch() - Working with Data and APIs in JavaScript

function deleteTitle(){
  //display hide form
  var x = document.querySelector("#deleteTitles");
    if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function deletePost(){ 

  //create var for input
  var uri = document.querySelector("#titleDel").value;
  //replacing localhost url by heroku application url
  var url = "https://warm-island-20847.herokuapp.com/books/";
  var options = {
    method:'DELETE'
  } 

  fetch(url + uri, options)
  .then(response  => {
    console.log(response);
    return response.json();
    })
    .then(book  => { 
      console.log(book);   
    })
      
}