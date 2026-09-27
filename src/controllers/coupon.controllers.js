const { StatusCode, Status } = require("../utils/status");
const couponServices = require("../services/coupon.services");
const { asyncWrapper } = require("../utils/wrapper");

const getCoupon = asyncWrapper(async (req, res, next) => {
  const code = req.params.code;
  const coupon = await couponServices.getCouponByName(code);
  res
    .status(StatusCode.OK)
    .json({ success: Status.SUCCESS, data: { coupon } });
});

module.exports = { getCoupon };
