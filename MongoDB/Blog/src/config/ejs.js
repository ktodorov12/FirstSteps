const expressLayout = require("express-ejs-layouts");

module.exports = {
  ejsConfig: (app) => {
    app.use(expressLayout);
    app.set("layout", "../views/layouts/main");
    app.set("view engine", "ejs");
  },
};
