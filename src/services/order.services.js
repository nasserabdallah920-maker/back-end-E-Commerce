const cartRepositories = require("../repositories/cart.repositories");
const orderRepositories = require("../repositories/order.repositories");
const couponRepositories = require("../repositories/coupon.repositories");
const productRepositories = require("../repositories/product.repositories");
const AppError = require("../utils/apperror");
const { StatusCode } = require("../utils/status");
const checkDate = require("../utils/checkdate");
const calculateDiscount = require("../utils/calculatediscount");
const mongoose = require("mongoose");

const createOrder = async (id, information) => {
  const cart = await cartRepositories.findCartByUserId(id);
  if (!cart || cart.items.length === 0) {
    throw new AppError("This user does not have a cart.", StatusCode.NOT_FOUND);
  }

  const orderItems = cart.items;

  const items = orderItems.map((e) => ({
    product: e.product._id,
    name: e.product.title,
    quantity: e.quantity,
    price: e.product.price,
  }));
  const priceArray = orderItems.map((e) => e.product.price * e.quantity);
  const totalPrice =
    priceArray.reduce((acc, cur) => {
      return acc + cur;
    }, 0) + Number(process.env.SHIPPING_PRICE);

  const order = {
    user: cart.userId,
    items,
    shippingAddress: information.shippingAddress,
    shipping: Number(process.env.SHIPPING_PRICE),
    totalPrice: totalPrice,
    finalPrice: totalPrice,
    couponCode: information.coupon || null,
  };

  for (const item of orderItems) {
    if (item.product.stock < item.quantity) {
      throw new AppError(
        `Insufficient stock for product: ${item.product.title}`,
        StatusCode.BAD_REQUEST,
      );
    }
  }

  const couponCode = information.coupon;
  let coupon = null;

  if (couponCode) {
    coupon = await couponRepositories.findCouponByCode(couponCode);
    if (!coupon) {
      throw new AppError("This coupon is incorrect.", StatusCode.NOT_FOUND);
    }
    if (coupon.minOrder > totalPrice) {
      throw new AppError(
        `The total price must be at least ${coupon.minOrder}`,
        StatusCode.BAD_REQUEST,
      );
    }

    const isExpired = checkDate(coupon.expiresAt);
    const isCompleted = coupon.usedCount >= coupon.usageLimit;
    const isActive = coupon.isActive;

    if (isExpired || isCompleted || !isActive) {
      throw new AppError("This coupon has expired", StatusCode.BAD_REQUEST);
    }
    const finalPrice = calculateDiscount(totalPrice, coupon);
    order.finalPrice = finalPrice;
    order.discount =  order.totalPrice -finalPrice ;
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    if (coupon) {
      const updatedCoupon = await couponRepositories.incrementUsedCount(
        coupon._id,
        session,
      );
      if (!updatedCoupon) {
        throw new AppError(
          "This coupon has reached its usage limit",
          StatusCode.BAD_REQUEST,
        );
      }
    }
    const savedOrder = await orderRepositories.saveOrder(order, session);

    for (const item of orderItems) {
      const updatedProduct = await productRepositories.decrementStock(
        item.product._id,
        item.quantity,
        session,
      );
      if (!updatedProduct) {
        throw new AppError(
          `Insufficient stock for product: ${item.product.title}`,
          StatusCode.BAD_REQUEST,
        );
      }
    }

    await cartRepositories.deleteAllItems(id, session);
    
    await session.commitTransaction();
    return savedOrder;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};

const getOrderById = async (orderId) => {
  const order = await orderRepositories.findOrderById(orderId);
  if (!order) {
    throw new AppError("There is no order with this ID.", StatusCode.NOT_FOUND);
  }
  return order;
};
const getUserOrder = async (orderId, userId) => {
  const order = await orderRepositories.findUserOrder(orderId, userId);
  if (!order) {
    throw new AppError("There is no order with this ID.", StatusCode.NOT_FOUND);
  }
  return order;
};
const getUserOrdersById = async (userId) => {
  const orders = await orderRepositories.findOrdersForUser(userId);
  if (!orders) {
    throw new AppError("This user has no orders.", StatusCode.NOT_FOUND);
  }
  return orders;
};
const changeOrderStatus = async (orderId, status) => {
  
  const order = await orderRepositories.orderStatus(orderId, status);
  if (!order) {
    throw new AppError(
      "There is an error in the system.",
      StatusCode.INTERNAL_SERVER_ERROR,
    );
  }
  return order;
};
const getAllOrders = async () => {
  const orders = await orderRepositories.findAllOrders();
  if (!orders) {
    throw new AppError(
      "There is an error in the system.",
      StatusCode.INTERNAL_SERVER_ERROR,
    );
  }
  return orders;
};

const cancelUserOrder = async (orderId, userId) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updatedOrder = await orderRepositories.cancelOrder(
      orderId,
      userId,
      session,
    );

    if (!updatedOrder) {
      throw new AppError(
        "Order not found or cannot be cancelled (already shipped, delivered, or cancelled).",
        StatusCode.BAD_REQUEST,
      );
    }

    for (const item of updatedOrder.items) {
      await productRepositories.incrementStock(
        item.product,
        item.quantity,
        session,
      );
    }

    if (updatedOrder.couponCode) {
      await couponRepositories.decrementUsedCount(
        updatedOrder.couponCode,
        session,
      );
    }

    await session.commitTransaction();
    return updatedOrder;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};

const confirmCashOrder = async (orderId, userId) => {
  const updatedOrder = await orderRepositories.confirmCashOrder(
    orderId,
    userId,
  );

  if (!updatedOrder) {
    throw new AppError(
      "Order not found or cannot be confirmed.",
      StatusCode.BAD_REQUEST,
    );
  }

  return updatedOrder;
};

const getLastPaidOrder = async (userId,paymobId) => {

  
  const order = await orderRepositories.findLastPaidOrder(userId,paymobId);
  if (!order) {
    throw new AppError(
      "No paid order found for this user.",
      StatusCode.NOT_FOUND,
    );
  }
  return order;
};

module.exports = {
  createOrder,
  getOrderById,
  getUserOrdersById,
  getUserOrder,
  changeOrderStatus,
  getAllOrders,
  cancelUserOrder,
  confirmCashOrder,
  getLastPaidOrder,
};
