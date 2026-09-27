const express = require("express");
const Router = express.Router();
const couponControllers = require("../controllers/coupon.controllers");
const { protect } = require("../middlewares/auth.middleware");

Router.get("/:code", protect , couponControllers.getCoupon);

module.exports = Router;