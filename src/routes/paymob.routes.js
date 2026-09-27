const express = require("express");
const Router = express.Router();
const webhookController = require("../controllers/paymob/webhook");
const paymobControllers = require("../controllers/paymob/payment.controllers");
const { protect } = require("../middlewares/auth.middleware");
const { asyncWrapper } = require("../utils/wrapper");

Router.get(
  "/pay/:orderId",
  protect,
  asyncWrapper(paymobControllers.paymentUrl),
);

Router.post("/webhook", webhookController.webhook);

module.exports = Router;
