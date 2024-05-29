const { Router } = require("express");
const { home, details, searchView } = require("../../controllers/catalog");
const mainRouter = Router();

mainRouter.get("/", home);
mainRouter.get("/post/:id", details);
mainRouter.get("/search", searchView);

module.exports = mainRouter;
