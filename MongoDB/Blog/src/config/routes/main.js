const { Router } = require("express");
const { home } = require("../../controllers/catalog");
const mainRouter = Router();

mainRouter.get("/", home);

module.exports = mainRouter;
