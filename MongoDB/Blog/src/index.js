require("dotenv").config();

const express = require("express");
const mainRouter = require("./config/routes/main");
const { ejsConfig } = require("./config/ejs");

const app = express();
const port = 5000 || process.env.PORT;

app.use("/static", express.static("static"));

ejsConfig(app);
app.use(mainRouter);

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
