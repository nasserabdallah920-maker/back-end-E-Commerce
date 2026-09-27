const express=require('express')
const Router = express.Router()
const {adminCouponsControllers}=require('../../controllers/index.controllers')
const { updateCouponSchema, createCouponSchema } = require('../../validators/coupon.validators');
const { validate } = require('../../middlewares/validate.middleware')
const {asyncWrapper}=require('../../utils/wrapper')
const { adminOnly } = require("../../middlewares/role.middleware");
const { protect } = require("../../middlewares/auth.middleware");
Router.use(protect,adminOnly)
Router.post('/',validate(createCouponSchema),asyncWrapper(adminCouponsControllers.createCoupon))
Router.get('/',asyncWrapper(adminCouponsControllers.getAllCoupons))
Router.get('/:id',asyncWrapper(adminCouponsControllers.getCouponById))
Router.patch('/:id',validate(updateCouponSchema),asyncWrapper(adminCouponsControllers.editCouponById))
Router.delete('/:id',asyncWrapper(adminCouponsControllers.deleteCouponById))

module.exports=Router