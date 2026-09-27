const express = require("express");
const { asyncWrapper } = require("../utils/wrapper");
const categoryControllers = require("../controllers/category.controllers");
const Router = express.Router();

Router.get("/", asyncWrapper(categoryControllers.getAllCategories));
Router.get("/:id", asyncWrapper(categoryControllers.getCategoryById));

module.exports = Router;
