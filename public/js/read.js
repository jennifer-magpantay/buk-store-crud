//everything is saved on MongoDB Atlas (cluster)
//to access this collection ('/books'):
//GET by Postman using URL http://localhost:8080/books
//fetch reference: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//fetch tutorial reference: https://www.youtube.com/watch?v=Kw5tC5nQMRY&t=689s
//2.3 HTTP Post Request with fetch() - Working with Data and APIs in JavaScript

function read(){
    //x.innerHTML = "testing";

    //function to display the hidded table
    var x = document.querySelector(".table");
    if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }  

    //replacing localhost url by heroku application url
    var url = "https://warm-island-20847.herokuapp.com/books";
  
    fetch(url)
    .then(response  => {
    console.log(response);
    return response.json(); //it will returns the data into json/array format
    //return response.text(); //will returns the data into txt format
    })
    .then(text  => { //.then(data => ...) or any other name
      console.log(text);

      //add a method to read the text/data and print it into the table on the html 
      var table="";
       
            for(var i=0;i<text.length;i++){
           table += "<tr>" +
           '<th>'+text[i]._id+'</th>'+ //printed as undefined
           '<th>'+text[i].title+'</th>'+
           '<th>'+text[i].year+'</th>'+
           '<th>'+text[i].price+'</th>'+
           '<th>'+text[i].category+'</th>'+
           '</tr>'; 
           }
        var x = document.querySelector('#tBody');

        x.innerHTML = table;

        //content = document.querySelector('#tBody').append(trHTML); prints tr/th NOPE      
      
      //content.innerHTML = text; //it will print the text without 'order'
      //to slice the data to elimitane 'elements' (begin or ends)
      //var print = text.slice(8, -13); 
      //content.innerHTML = print;
    })
    .catch(error => {
      console.log("Error");
      console.error(error);
    });   

}
