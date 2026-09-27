const express = require("express");
const Router = express.Router();
const { asyncWrapper } = require("../utils/wrapper");
const { validate } = require("../middlewares/validate.middleware");
const { protect } = require("../middlewares/auth.middleware");
const { changePasswordValidate, userInformationValidate } = require("../validators/user.validators");
const {userControllers}=require('../controllers/index.controllers')
Router.use(protect)
Router.get("/get/me",asyncWrapper(userControllers.getUser));
Router.delete("/delete/me",asyncWrapper(userControllers.deleteUser));
Router.patch("/update/information/me",validate(userInformationValidate),asyncWrapper(userControllers.changeUserInformation));
Router.patch("/update/password/me",validate(changePasswordValidate),asyncWrapper(userControllers.changeUserPassword));
Router.post("/wishlist/:productId",asyncWrapper(userControllers.addToWishlist));
Router.delete("/wishlist/:productId",asyncWrapper(userControllers.removeFromWishlist));
Router.get("/wishlist",asyncWrapper(userControllers.getWishlist));

module.exports = Router