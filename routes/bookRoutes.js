import express from "express";
import { promises as fs } from "fs";

//setting the router
const router = express.Router();

//get all titles
router.get("/", async (_req, res, next) => {
  try {
    //readh the file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //to get rid off of nextId from the results, delete it before send data
    delete data.nextId;
    res.send(data);
  } catch (err) {
    next(err);
  }
});

//get titles by id
//http://localhost:3000/books/1
// router.get("/:id", async (req, res, next) => {
//   try {
//     //readh the file
//     const data = JSON.parse(await fs.readFile(global.fileName));
//     //find the id in the file
//     const book = data.books.find((item) => item.id === parseInt(req.params.id));
//     res.send(book);
//   } catch (err) {
//     next(err);
//   }
// });

//get titles by title, using URL query
//http://localhost:3000/books?title=It Catches My Heart in Its Hands
// router.get("/", async (req, res, next) => {
//   try {
//     let query = req.query;
//     //readh the file
//     const data = JSON.parse(await fs.readFile(global.fileName));
//     //find the id in the file
//     const book = data.books.find((item) => item.title === query.title);
//     res.send(book);
//   } catch (err) {
//     next(err);
//   }
// });

//add a new title
router.post("/", async (req, res, next) => {
  try {
    //create an variable that will hold the result of our request
    let book = req.body;
    //read data
    const data = JSON.parse(await fs.readFile(global.fileName));
    //defining your new book and setting an incremented id
    book = {
      id: data.nextId++,
      title: book.title,
      year: book.year,
      price: book.price,
      category: book.category,
    };
    //push all new info into json
    data.books.push(book);
    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(book);
  } catch (err) {
    next(err);
  }
});

//update a title
// router.put("/:id", async (req, res, next) => {
// updating passing all params as body required
router.put("/", async (req, res, next) => {
  try {
    //create an variable that will hold the result of our request
    let book = req.body;
    //read file
    const data = JSON.parse(await fs.readFile(global.fileName));

    book = {
      id: book.id,
      title: book.title,
      year: book.year,
      price: book.price,
      category: book.category,
    };
    //find the index of the element inside the json file, where the item id is === id of the req.body
    const index = data.books.findIndex((item) => item.id === book.id);

    if (index === -1) {
      throw new Error("ID Title  not found. Try it again");
    }
    //once it is found, set it the props you want to update
    // data.books[index].id = book.id;
    data.books[index].title = book.title;
    data.books[index].year = book.year;
    data.books[index].price = book.price;
    data.books[index].category = book.category;
    //now, over write the file
    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
    //return the element
    console.log(book.id);
    res.send(data.books[index]);
  } catch (err) {
    next(err);
  }
});

//delete a title by id
router.delete("/:id", async (req, res, next) => {
  try {
    //read file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //save the deleted id into an temp variable and return to the user
    let del = data.books.filter((item) => item.id === parseInt(req.params.id));
    //now, filter id we want to remove from the original json file
    data.books = data.books.filter(
      (item) => item.id !== parseInt(req.params.id)
    );
    //and over write it, without the chosen id
    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
    //return the data deleted
    res.send(del);
  } catch (err) {
    next(err);
  }
});

//adding errors
router.use((err, _req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default router;
