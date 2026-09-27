const express = require("express");
const Router = express.Router();

const {adminUsersControllers} = require("../../controllers/index.controllers");
const { asyncWrapper } = require("../../utils/wrapper");
const { adminOnly } = require("../../middlewares/role.middleware");
const { protect } = require("../../middlewares/auth.middleware");

Router.use(protect, adminOnly);
Router.get("/get/:id", asyncWrapper(adminUsersControllers.getUser));
Router.get("/getall", asyncWrapper(adminUsersControllers.getAllUsers));
Router.get("/search", asyncWrapper(adminUsersControllers.searchForUser));
Router.delete("/delete/:id", asyncWrapper(adminUsersControllers.deleteUser));
Router.patch("/block/:id", asyncWrapper(adminUsersControllers.blockUser));


module.exports = Router;
