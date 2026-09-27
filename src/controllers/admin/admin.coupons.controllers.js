const { adminCouponsServices } = require("../../services/index.services");
const { StatusCode, Status } = require("../../utils/status");


const createCoupon=async(req,res,next)=>{
    const body = req.body
    const coupon = await adminCouponsServices.addCoupon(body)
    res.status(StatusCode.CREATED).json({success:Status.SUCCESS,data:coupon})
}
const getAllCoupons = async (req, res, next) => {
  const coupons = await adminCouponsServices.getAllCoupons();
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: coupons });
};

const getCouponById = async (req, res, next) => {
  const { id } = req.params;
  const coupon = await adminCouponsServices.getCouponById(id);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: coupon });
};

const deleteCouponById = async (req, res, next) => {
  const { id } = req.params;
  await adminCouponsServices.deleteCouponById(id);
  res.status(StatusCode.NO_CONTENT).send()
};

const editCouponById = async (req, res, next) => {
  const { id } = req.params;
  const newData = req.body;
  const updatedCoupon = await adminCouponsServices.editCouponById(id, newData);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: updatedCoupon });
};

module.exports = { createCoupon, getAllCoupons, getCouponById, deleteCouponById, editCouponById };