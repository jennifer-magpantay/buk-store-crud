import express from "express";
import { promises as fs } from "fs";

//setting the router
const router = express.Router();

//get all titles
router.get("/", async (req, res, next) => {
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
router.get("/:id", async (req, res, next) => {
  try {
    //readh the file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //find the id in the file
    const book = data.books.find((item) => item.id === parseInt(req.params.id));
    res.send(book);
  } catch (err) {
    next(err);
  }
});

//get titles by title, using URL query
//http://localhost:3000/books?title=It Catches My Heart in Its Hands
router.get("/", async (req, res, next) => {
  try {
    let query = req.query;
    //readh the file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //find the id in the file
    const book = data.books.find((item) => item.title === query.title);
    res.send(book);
  } catch (err) {
    next(err);
  }
});

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
router.put("/", async (res, req, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

//delete a title
router.delete("/", async (res, req, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

//adding errors
router.use((err, _req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default router;
