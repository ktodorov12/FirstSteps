const { urlencoded, static: staticExpress } = require("express");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const metodOverride = require("method-override");

module.exports = {
  expressConfig: (app) => {
    app.use(urlencoded({ extended: true }));
    app.use("/static", staticExpress("static"));
    app.use(cookieParser);
    app.use(
      session({
        secret: "keyborad cat",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
          mongoUrl: process.env.MONGODB_URI,
        }),
      })
    );
    app.use(metodOverride("_method"));
  },
};
