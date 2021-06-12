import { getBooks, postBook, updateBook, deleteBookByIndex } from '../js/requests.js';
import { formatNumber } from '../helpers/formarters.js'

let bookList = [];

const form = document.querySelector('form');
const modal = document.querySelector('#js-modal');
const buttonSubmit = document.querySelector('#js-button-submit');

async function start() {
    // set DOM elements
    const buttonGet = document.querySelector('#js-button-get');
    const buttonAdd = document.querySelector('#js-button-add');
    const buttonClear = document.querySelector('#js-button-clear');

    // functions
    bookList = await getBooks();

    // set events
    buttonGet.addEventListener('click', (event) => {
        event.preventDefault();
        renderTableContent(bookList);
    })

    buttonAdd.addEventListener('click', (event) => {
        event.preventDefault();
        addNewBook();
    })

    buttonClear.addEventListener('click', (event) => {
        event.preventDefault();
        clearForm();
    })
    
    // set events to close modal
}

function renderTableContent(data) {
    // display the table 
    const table = document.querySelector('#js-table');
    table.style.display = "block";

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
        const tdEdit = document.createElement('td');
        const buttonEdit = document.createElement('button');
        buttonEdit.classList.add('js-button--edit');
        const tdDelete = document.createElement('td');
        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('js-button--delete');

        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdCategory);
        tr.appendChild(tdYear);
        tr.appendChild(tdPrice);
        tdEdit.appendChild(buttonEdit)
        tr.appendChild(tdEdit);
        tdDelete.appendChild(buttonDelete)
        tr.appendChild(tdDelete);
        document.querySelector('#js-tbody').appendChild(tr);
    }

    // once the table is built, we need to pass events to their buttons
    // button edit
    // .querySelectorAll returns an Nodelist with all results
    // to get the individual index of those results, we should pass a for loop
    // then, add an event listener to each one
    const btnEdit = document.querySelectorAll('.js-button--edit');
    for (let i = 0; i < btnEdit.length; i++) {
        btnEdit[i].addEventListener('click', (event) => {
            event.preventDefault();
            // find book by index to update
            const { id, title, category, year, price } = data.books[i];
            openFormModal(id, title, category, year, price);
        })
    }

    // button delete
    const btnDelete = document.querySelectorAll('.js-button--delete');

    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener('click', (event) => {
            event.preventDefault();
            // delete book by index
            const { id } = data.books[i];
            deleteBookByIndex(id);
        })
    }
}

function addNewBook() {
    // display modal with form
    modal.style.display = "block";

    // add event to grab input value from form  
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        handleFormSubmit();
    })

    buttonSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        handleFormSubmit();
    })
}

function clearForm() {
    form[0].value = "";
    form[1].value = "";
    form[2].value = "";
    form[3].value = "";
}

function handleFormSubmit() {
    // event.preventDefault();
    // once the form is filled we will submit the information by fetching the data
    // for that, lets create a a variable to get value from the each input  
    const title = form[0].value
    const category = form[1].value
    const year = form[2].value
    const price = form[3].value

    // call function to fecth data
    postBook(title, category, year, price);
}

function openFormModal(id, title, category, year, price) {
    //  display the modal
    modal.style.display = "block";

    // set on form fields the data index
    form[0].value = title;
    form[1].value = category;
    form[2].value = year;
    form[3].value = price;

    buttonSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        updateBook(id, title, category, year, price);
    })
}
start();

export { openFormModal };