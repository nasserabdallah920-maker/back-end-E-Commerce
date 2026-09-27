const { adminOrderServices,orderServices } = require("../../services/index.services");
const { StatusCode, Status } = require("../../utils/status");
const changeOrderStatus = async (req, res, next) => {
  const { orderId } = req.params;
  const { newStatus } = req.body;
  const order = await orderServices.changeOrderStatus(orderId, newStatus);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: order });
};
const getAllOrders = async (req, res, next) => {
  const order = await orderServices.getAllOrders();
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: order });
};

const getOneOrder=async(req,res,next)=>{
  const {orderId} =req.params

  const order = await adminOrderServices.getOrderById(orderId)
   res.status(StatusCode.OK).json({success:Status.SUCCESS,data:order}) 
}
const getUserOrders=async(req,res,next)=>{
  const {id} =req.params
  const orders = await orderServices.getUserOrdersById(id)
   res.status(StatusCode.OK).json({success:Status.SUCCESS,data:orders}) 
}
module.exports = { changeOrderStatus, getAllOrders, getOneOrder,getUserOrders };
