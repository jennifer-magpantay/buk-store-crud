import express from "express";
import cors from "cors";
import route from "./routes/bookRoutes.js";

//global variables: path for data folder
global.fileName = "./data/books.json";

//creating a variable app and setting it to use a json file and cors
const app = express();
app.use(express.json());
app.use(cors());

//seting static files to set an index.html
app.use(express.static("public"));

//redirecting the requests to another routes file
app.use("/books", route);

//listening port
app.listen(3000, () => {
  console.log("API running sucessfully");
});
