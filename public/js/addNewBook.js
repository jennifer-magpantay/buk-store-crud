// global variables
const form = document.querySelector('form');

export default function addNewBook() {
    console.log("Adding new book")

    // display the table 
    const formContainer = document.querySelector('.form__container');
    formContainer.style.display = "block";

    // add event to grab input value    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSubmit();
    })

    const buttonSubmit = document.querySelector('#button-submit');
    buttonSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        handleSubmit();
    })

    const buttonClear = document.querySelector('#button-clear');
    buttonClear.addEventListener('click', (event) => {
        event.preventDefault();
        clearForm();
    })
}

function clearForm() {
    form[0].value = "";
    form[1].value = "";
    form[2].value = "";
    form[3].value = "";
}

function handleSubmit() {
    // event.preventDefault();
    // once the form is filled we will submit the information by fetching the data
    // for that, lets create a a variable to get value from the each input  
    const title = form[0].value
    const category = form[1].value
    const year = form[2].value
    const price = form[3].value

    // call function to fecth data
    fetchData(title, category, year, price);
}

function fetchData(title, category, year, price) {
    //then, assing then to another variable as object
    const book = { title: title, category: category, year: year, price: price };

    //replacing localhost url by heroku application url
    const url = "http://localhost:3000/books/";
    const options = {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
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
            // console.log(book);
        })
        .catch((error) => {
            console.log("Error");
            console.error(error);
        });
}

// ERROR!! PREVENT DEFAULT NOT WORKING!
// credentials: "include" = returns error!!,

