require("dotenv").config();

const express = require("express");
const mainRouter = require("./config/routes/main");
const { ejsConfig } = require("./config/ejs");
const { expressConfig } = require("./config/express");
const connectDB = require("./config/db");

const app = express();
const port = 5000 || process.env.PORT;

connectDB();
ejsConfig(app);
expressConfig(app);
app.use(mainRouter);

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
