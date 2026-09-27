const express = require("express");
const Router = express.Router();
const {adminOrdersControllers} = require("../../controllers/index.controllers");
const { asyncWrapper } = require("../../utils/wrapper");
const { adminOnly } = require("../../middlewares/role.middleware");
const { protect } = require("../../middlewares/auth.middleware");
const { validate } = require("../../middlewares/validate.middleware");
const { updateOrderStatusSchema } = require("../../validators/order.validators");
Router.use(protect,adminOnly)
Router.patch('/status/:orderId', validate(updateOrderStatusSchema), asyncWrapper(adminOrdersControllers.changeOrderStatus))
Router.get('/',asyncWrapper(adminOrdersControllers.getAllOrders))
Router.get('/user/:id', asyncWrapper(adminOrdersControllers.getUserOrders))
Router.get('/:orderId',asyncWrapper(adminOrdersControllers.getOneOrder))


module.exports=Router