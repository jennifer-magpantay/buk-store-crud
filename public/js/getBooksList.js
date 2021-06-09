import { formatNumber } from '../helpers/formarters.js'

export default function getBooksList() {

    //getting request by fecth
    const URL = "http://localhost:3000/books";
    fetch(URL)
        .then((response) => {
            // console.log(response);
            return response.json();
            //response.json() returns the data into json/array format
            //return response.text() returns the data into txt format
        })
        .then((data) => {
            // console.log(data);
            // display the each data into a table
            renderTableContent(data);
        })
        .catch((error) => {
            console.log("Error");
            console.error(error);
        });
}

function renderTableContent(data) {
    // display the table 
    const table = document.querySelector('#table');
    table.style.display = "block";
    console.log(data.books);

    // create HTML elements for each item from data list
    for (const book of data.books) {
        const tr = document.createElement('tr');
        const tdId = document.createElement('td');
        tdId.textContent = book.id;
        const tdTitle = document.createElement('td');
        tdTitle.textContent = book.title;
        const tdCategory = document.createElement('td')
        tdCategory.textContent = book.category;
        const tdYear = document.createElement('td');
        tdYear.textContent = book.year;
        const tdPrice = document.createElement('td');
        tdPrice.textContent = formatNumber(book.price);

        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdCategory);
        tr.appendChild(tdYear);
        tr.appendChild(tdPrice);
        document.querySelector('#tBody').appendChild(tr);
    }
}


