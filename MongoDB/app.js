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
  res.json({ mssg: "welcome to the api" });
});
