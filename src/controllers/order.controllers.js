const {orderServices}=require('../services/index.services');
const { StatusCode, Status } = require('../utils/status');
const order = async (req, res, next) => {
  const id = req.user.id;
  const body = req.body
  const information = {
    shippingAddress: body.shippingAddress,
    coupon:body.couponCode
  };
  const newOrder=await orderServices.createOrder(id,information)
  res.status(StatusCode.OK).json({success:Status.SUCCESS,data:newOrder})
};
const getUserOrders=async(req,res,next)=>{
  const id =req.user.id
  const orders = await orderServices.getUserOrdersById(id)
   res.status(StatusCode.OK).json({success:Status.SUCCESS,data:orders}) 
}
const getOneOrder=async(req,res,next)=>{
  const {orderId} =req.params
  const userId = req.user.id
  const order = await orderServices.getUserOrder(orderId,userId)
   res.status(StatusCode.OK).json({success:Status.SUCCESS,data:{order}}) 
}
const cancelOneOrder=async(req,res,next)=>{
  const {orderId} =req.params
  const userId = req.user.id
  const order = await orderServices.cancelUserOrder(orderId, userId)
  res.status(StatusCode.NO_CONTENT).send()
}

const confirmCashOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.user.id;
  
  const order = await orderServices.confirmCashOrder(orderId, userId);
  
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: { order } });
};

const getLastPaidOrder = async (req, res, next) => {
  const userId = req.user.id;
  const {paymobId}=req.params
  const order = await orderServices.getLastPaidOrder(userId,paymobId);
  
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: { order } });
};

module.exports={order,getOneOrder,getUserOrders,cancelOneOrder,confirmCashOrder,getLastPaidOrder}