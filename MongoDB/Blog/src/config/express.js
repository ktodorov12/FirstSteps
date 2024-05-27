const { urlencoded, static: staticExpress } = require("express");

module.exports = {
  expressConfig: (app) => {
    app.use(urlencoded({ extended: true }));
    app.use("/static", staticExpress("static"));
  },
};
