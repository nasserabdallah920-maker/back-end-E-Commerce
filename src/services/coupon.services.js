const Coupon = require("../models/coupon.model");
const AppError = require("../utils/apperror");
const { StatusCode } = require("../utils/status");

const getCouponByName = async (code) => {
  const coupon = await Coupon.findOne({ code: code.toUpperCase() });
  
  if (!coupon) {
    throw new AppError("Coupon not found", StatusCode.NOT_FOUND);
  }
  
  if (!coupon.isActive) {
      throw new AppError("Coupon has expired", StatusCode.BAD_REQUEST);
  }

  const now = new Date();
  if (new Date(coupon.expiresAt) <= now) {
    throw new AppError("Coupon has expired", StatusCode.BAD_REQUEST);
  }
  
  if (coupon.usedCount >= coupon.usageLimit) {
    throw new AppError("Coupon usage limit exceeded", StatusCode.BAD_REQUEST);
  }
  
  return coupon;
};

module.exports = {
  getCouponByName
};
