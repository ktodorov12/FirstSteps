const express = require("express");

//init app & middleware
const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

//routes
app.get("/books", (req, res) => {
  res.json({ mssg: "welcome to the api" });
});
