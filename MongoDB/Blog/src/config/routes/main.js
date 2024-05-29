const { Router } = require("express");
const { home, details } = require("../../controllers/catalog");
const mainRouter = Router();

mainRouter.get("/", home);
mainRouter.get("/post/:id", details);

module.exports = mainRouter;
