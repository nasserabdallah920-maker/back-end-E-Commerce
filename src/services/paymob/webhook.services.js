const { StatusCode, Status } = require("../../utils/status");
const orderRepositories = require("../../repositories/order.repositories");
const verifyHMAC = require("../../utils/HMAC");
const AppError = require("../../utils/apperror");

const handleWebhook = async (obj, hmac) => {
  const verify = verifyHMAC(obj, hmac);
  if (!verify) {
    throw new AppError("Invalid HMAC signature.", StatusCode.UNAUTHORIZED);
  }
  const status = {
    success: obj.success,
    transaction_id: obj.id,
    order_id: obj.order.id,
    paid_price: obj.amount_cents,
    currency: obj.currency,
    method: obj.source_data.type,
    payment_status: obj.order.payment_status,
  };
  const order = await orderRepositories.findOrderByPaymobId(status.order_id);

  if (!status.success || status.payment_status !== "PAID") {

    if (order && order.orderStatus !== "cancelled") {
      await orderRepositories.orderStatus(order._id, "cancelled");
    }
    return status;
  }


  if (order) {
    await orderRepositories.paidOrder(order._id);
  }
  return status;
};

module.exports = { handleWebhook };
