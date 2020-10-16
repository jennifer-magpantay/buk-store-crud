function update(){
    var x = document.querySelector("#updateTitles");
    if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }  
  alert("Hello stranger!! Update function still in development!!"); 
}

function updatePOST(){

    var id = document.querySelector("#id").value;
    var title = document.querySelector("#title").value;
    var year = document.querySelector("#year").value;
    var price = document.querySelector("#price").value;
    var category = document.querySelector("#categoryList").value;
  
    var book = { title: title, year: year, price: price, category: category }

      //replacing localhost url by heroku application url
    var url = "https://warm-island-20847.herokuapp.com/books/";
    var options = {
      method:'PUT',
      cache: 'no-cache', 
      credentials: 'include', 
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type':'application/json'
        },
      body:JSON.stringify(book)
      }
  
    fetch(url + id , options)
    .then(response  => {
      console.log(response);
      return response.json(); 
      })
      .then(book  => { 
        console.log(book);   
  
      })
}