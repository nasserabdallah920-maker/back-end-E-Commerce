const Order = require("../../models/order.model");
const User = require("../../models/user.model");
const Coupon = require("../../models/coupon.model");

const getStatistics = async () => {
  // total orders price that are confirmed
  const confirmedOrders = await Order.aggregate([
    { $match: { orderStatus: "confirmed" } },
    { $group: { _id: null, totalConfirmedPrice: { $sum: "$finalPrice" } } },
  ]);
  const totalConfirmedPrice = confirmedOrders.length > 0 ? confirmedOrders[0].totalConfirmedPrice : 0;

  // total orders
  const totalOrders = await Order.countDocuments();

  // total users
  const totalUsers = await User.countDocuments();

  // total coupon
  const totalCoupons = await Coupon.countDocuments();

  // active coupons
  const activeCoupons = await Coupon.countDocuments({ isActive: true, expiresAt: { $gt: new Date() } });
  const statistics={
    totalConfirmedPrice,
    totalOrders,
    totalUsers,
    totalCoupons,
    activeCoupons
  }
  return statistics;
};

module.exports = { getStatistics };
