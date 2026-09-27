const paymobServices = require("../../services/paymob/payment.services")
const { StatusCode, Status } = require("../../utils/status")

const paymentUrl=async(req,res,next)=>{
    const {orderId}=req.params
    const url = await paymobServices.paymentOrder(orderId)
    res.status(StatusCode.OK).json({success:Status.SUCCESS,data:{url}})
}

module.exports={paymentUrl}