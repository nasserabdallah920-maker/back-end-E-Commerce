const express = require("express");
const Router = express.Router();
const authControllers = require("../controllers/auth.controllers");
const { validate } = require("../middlewares/validate.middleware");
const schemas = require("../validators/auth.validators");
const { asyncWrapper } = require("../utils/wrapper");
const { protect } = require("../middlewares/auth.middleware");

Router.post(
  "/register",
  validate(schemas.registerValidate),
  asyncWrapper(authControllers.createUser),
);
Router.post(
  "/login",
  validate(schemas.loginValidate),
  asyncWrapper(authControllers.login),
);
Router.post("/logout", protect, asyncWrapper(authControllers.logOut));
Router.post("/refresh", asyncWrapper(authControllers.refresh));

module.exports = Router;
