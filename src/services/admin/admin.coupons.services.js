const couponRepositories = require("../../repositories/coupon.repositories");
const AppError = require("../../utils/apperror");
const { StatusCode } = require("../../utils/status");

const addCoupon = async (body) => {
  const { code, type, value, maxDiscount, minOrder, expiresAt, usageLimit } =
    body;
  const newCoupon = {
    code,
    type,
    value,
    maxDiscount,
    minOrder,
    expiresAt,
    usageLimit,
  };

  const coupon=await couponRepositories.saveCoupon(newCoupon)
  if(!coupon){throw new AppError('An error occurred while saving. Please try again later.',StatusCode.INTERNAL_SERVER_ERROR)}
  return coupon



};

const getAllCoupons = async () => {
  const coupons = await couponRepositories.findAllCoupons();
  return coupons;
};

const getCouponById = async (id) => {
  const coupon = await couponRepositories.findCouponById(id);
  if (!coupon) {
    throw new AppError("Coupon not found", StatusCode.NOT_FOUND);
  }
  return coupon;
};

const deleteCouponById = async (id) => {
  const coupon = await couponRepositories.findCouponById(id);
  if (!coupon) {
    throw new AppError("Coupon not found", StatusCode.NOT_FOUND);
  }
  await couponRepositories.deleteCoupon(id);
};

const editCouponById = async (id, newData) => {
  const coupon = await couponRepositories.findCouponById(id);
  if (!coupon) {
    throw new AppError("Coupon not found", StatusCode.NOT_FOUND);
  }
  const updatedCoupon = await couponRepositories.editCoupon(id, newData);
  return updatedCoupon;
};

module.exports = { addCoupon, getAllCoupons, getCouponById, deleteCouponById, editCouponById };