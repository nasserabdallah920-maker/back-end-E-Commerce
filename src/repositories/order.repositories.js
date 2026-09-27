const Order = require("../models/order.model");

const saveOrder = async (order, session) => {
  const newOrder = new Order(order);
  await newOrder.save({ session });
  return newOrder;
};

const findOrdersForUser = async (userId) => {
  const orders = await Order.find({ user:userId });
  return orders;
};

const findUserOrder = async (orderId, userId) => {
  const orders = await Order.findOne({ _id: orderId, user:userId });
  return orders;
};

const findOrderById = async (orderId, session) => {
  const order = await Order.findById(orderId).populate("user");
  return order;
};
const findOrderByPaymobId = async (paymobId) => {
  const order = await Order.findOne({ paymob_id: paymobId }).populate("user");
  return order;
};

const orderStatus = async (orderId, status, session) => {
  const newStatus = status || "cancelled";
  const order = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus: newStatus },
    { returnDocument: "after", runValidators: true, session },
  );
  return order;
};

const findAllOrders = async () => {
  const orders = await Order.find();
  return orders;
};


const paidOrder = async (orderId) => {
  const order = await Order.findOneAndUpdate(
    { _id: orderId, paymentStatus: { $ne: "paid" } },
    { paymentStatus: "paid", orderStatus: "confirmed" },
    { runValidators: true, returnDocument: "after" }
  );
  return order;
};


const cancelOrder = async (orderId, userId, session) => {
  const order = await Order.findOneAndUpdate(
    {
      _id: orderId,
      user: userId,
      orderStatus: { $nin: ["shipped", "delivered", "cancelled"] },
    },
    { orderStatus: "cancelled" },
    { returnDocument: "after", runValidators: true, session }
  );
  return order;
};


const setPaymobId = async (orderId, paymobId) => {
  const order = await Order.findOneAndUpdate(
    { _id: orderId, paymob_id: null },
    { paymob_id: paymobId },
    { returnDocument: "after" }
  );
  return order;
};

const confirmCashOrder = async (orderId, userId, session) => {
  const order = await Order.findOneAndUpdate(
    {
      _id: orderId,
      user: userId,
      orderStatus: "pending"
    },
    { 
      paymentMethod: "cash", 
      orderStatus: "confirmed" 
    },
    { returnDocument: "after", runValidators: true, session }
  );
  return order;
};

const findLastPaidOrder = async (userId,paymobId) => {
  const order = await Order.find({
    user: userId,
    paymob_id:paymobId
  });
  return order;
};

module.exports = {
  saveOrder,
  findOrderById,
  findUserOrder,
  findOrdersForUser,
  orderStatus,
  findAllOrders,
  findOrderByPaymobId,
  paidOrder,
  cancelOrder,
  setPaymobId,
  confirmCashOrder,
  findLastPaidOrder,
};
