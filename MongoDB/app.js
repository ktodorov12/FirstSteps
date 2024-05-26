const express = require("express");
const { connectToDb, getDb } = require("./db");

//init app & middleware
const app = express();
const port = 5000;

//db conncetion
let db;

connectToDb((err) => {
  if (err) {
    throw new Error(err);
  }

  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
  db = getDb();
});

//routes
app.get("/books", (req, res) => {
  let books = [];

  db.collection("books")
    .find() //cursor
    .sort({ author: 1 }) //cursor
    .forEach((book) => books.push(book))
    .then(() => {
      res.json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch documetns" });
    });
});
