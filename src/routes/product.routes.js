const express = require("express");
const asyncWrapper = require("../utils/wrapper").asyncWrapper;
const productControllers = require("../controllers/product.controllers");
const Router = express.Router();


Router.get("/get", asyncWrapper(productControllers.searchProducts));

Router.get("/", asyncWrapper(productControllers.getAllProducts));

Router.get("/:id", asyncWrapper(productControllers.getProductById));


Router.get('/category/:id',productControllers.getProductsByCategory)




module.exports = Router;


