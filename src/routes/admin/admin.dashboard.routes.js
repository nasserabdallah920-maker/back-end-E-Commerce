const express = require("express");
const Router = express.Router();

const { adminDashboardControllers } = require("../../controllers/index.controllers");
const { asyncWrapper } = require("../../utils/wrapper");
const { adminOnly } = require("../../middlewares/role.middleware");
const { protect } = require("../../middlewares/auth.middleware");

Router.use(protect, adminOnly);
Router.get("/statistics", asyncWrapper(adminDashboardControllers.getDashboardStatistics));

module.exports = Router;
