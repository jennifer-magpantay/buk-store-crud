// Set here all HTTP requests

// global variables
const URL = "http://localhost:3000/books";

// first, create a function that will return the response as json() and also any errors if there is one
async function returnFetchJson(url, options) {
    try {
        const response = await fetch(url, options);
        // if response is ok, then return response.json
        if (response.ok) {
            return response.json();
        } else {
            // throw a error
            throw new Error(response.statusText);
        }
    } catch (error) {
        // throwError("Data loading error", error);
        throw error;
    }
}

// then,pass the function into the requests
// get
function getBooks() {
    return returnFetchJson(URL);
}

// post
function postBook(title, category, year, price) {
    // get the param values from index.js
    // then, assing them to another variable as object
    const book = { title: title, category: category, year: year, price: price };

    // set the object as body of the post request
    return returnFetchJson(URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
    });
}

// Delete
function deleteBookByIndex(id) {
    // get the param values from index.js
    //  then, pass it as query for the delete request
    return returnFetchJson(`${URL}/${id}`, {
        method: 'DELETE',
    });
}

// update: postman working well, not updating on the browser
// obs: or it is not updating or it is not getting the new values from inputs
function updateBook(id, title, category, year, price) {
    // create an object related to data books info
    const book = { id: id, title: title, category: category, year: year, price: price };

    return returnFetchJson(URL, {
        method: 'PUT',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-type": "application/json",
        },
        body: JSON.stringify(book),
    });
}

export { getBooks, deleteBookByIndex, postBook, updateBook }