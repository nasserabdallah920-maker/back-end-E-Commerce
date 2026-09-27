const Coupon = require("../models/coupon.model");

const saveCoupon = async (coupon) => {
  const newCoupon = new Coupon(coupon);
  await newCoupon.save();
  return newCoupon;
};

const findAllCoupons = async () => {
  const coupons = await Coupon.find();
  return coupons;
};

const findCouponById = async (couponId) => {
  const coupon = await Coupon.findById(couponId);
  return coupon;
};
const findCouponByCode = async (couponCode) => {
  const coupon = await Coupon.findOne({ code: couponCode });
  return coupon;
};

const deleteCoupon = async (couponId) => {
  await Coupon.findByIdAndDelete(couponId);
  return;
};

const editCoupon = async (couponId, newData) => {
  const coupon = await Coupon.findByIdAndUpdate(couponId, newData, {
    returnDocument: "after",
    runValidators: true,
  });
  return coupon;
};


const incrementUsedCount = async (couponId, session) => {
  return Coupon.findOneAndUpdate(
    {
      _id: couponId,
      isActive: true,
      $expr: { $lt: ["$usedCount", "$usageLimit"] },
    },
    { $inc: { usedCount: 1 } },
    { new: true, session }
  );
};

const decrementUsedCount = async (couponCode, session) => {
  return Coupon.findOneAndUpdate(
    { code: couponCode },
    { $inc: { usedCount: -1 } },
    { new: true, session }
  );
};


module.exports = {
  saveCoupon,
  findAllCoupons,
  findCouponById,
  deleteCoupon,
  editCoupon,
  findCouponByCode,
  incrementUsedCount,
  decrementUsedCount,
};
