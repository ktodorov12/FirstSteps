require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mainRouter = require("./config/routes/main")

const app = express();
const port = 5000 || process.env.PORT;

app.use("/static", express.static("static"));

app.use(expressLayout);
app.set("layout", "../views/layouts/main");
app.set("view engine", "ejs");

app.use(mainRouter)

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
