const orderRepositories = require("../../repositories/order.repositories");
const AppError = require("../../utils/apperror");
const { StatusCode } = require("../../utils/status");

const getOrderById = async (orderId) => {
  const order = await orderRepositories.findOrderById(orderId);
  if (!order) {
    throw new AppError("There is no order with this ID.", StatusCode.NOT_FOUND);
  }
  return order;
};


module.exports = { getOrderById };
