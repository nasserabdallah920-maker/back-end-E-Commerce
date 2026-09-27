const paymob = require("../../config/paymob.config");
const orderRepositories = require("../../repositories/order.repositories");
const AppError = require("../../utils/apperror");
const { StatusCode } = require("../../utils/status");

const authenticate = async () => {
  const response = await paymob.post("/auth/tokens", {
    api_key: process.env.PAYMOB_API_KEY,
  });
  return response.data.token;
};
const createOrder = async (token, order) => {

  const response = await paymob.post("/ecommerce/orders", {
    auth_token: token,
    amount_cents:   Math.round(order.finalPrice*100),
    currency: "EGP",
  });

  return response.data.id;
};
const getPaymentKey = async (token, order, paymob_order_id) => {
  try {
    const response = await paymob.post("/acceptance/payment_keys", {
      auth_token: token,
      amount_cents:  Math.round(order.finalPrice*100),
      currency: "EGP",
      integration_id: process.env.INTEGRATION_ID,
      order_id: paymob_order_id,
      expiration: 3600,
      billing_data: {
        apartment: "NA",
        first_name: order.user.firstName,
        last_name: order.user.lastName,
        email: order.user.email,
        phone_number: order.user.phoneNumber,
        street: "NA",
        building: "NA",
        floor: "NA",
        city: "NA",
        state: "NA",
        country: "EG",
        postal_code: "NA",
        shipping_method: "NA",
      },
    });
    return response.data.token;
  } catch (err) {
    throw new Error(err);
  }
};

const buildIframeUrl = (payment_key) => {
  return `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${payment_key}`;
};

const paymentOrder = async (orderId) => {
  const order = await orderRepositories.findOrderById(orderId);
  if (!order) {
    throw new AppError("There is no order with this ID.", StatusCode.NOT_FOUND);
  } 
  if (order.paymentStatus === "paid") {
    throw new AppError(
      "This order has already been paid.",
      StatusCode.BAD_REQUEST
    );
  }

  if (order.orderStatus === "cancelled") {
    throw new AppError(
      "Cannot pay for a cancelled order.",
      StatusCode.BAD_REQUEST
    );
  }

  const token = await authenticate();
  const paymob_order_id = await createOrder(token, order);
  const payment_key = await getPaymentKey(token, order, paymob_order_id);
  const url = buildIframeUrl(payment_key);

  if (order.paymob_id) {
    return url
  }



  const updatedOrder = await orderRepositories.setPaymobId(
    orderId,
    paymob_order_id
  );

  if (!updatedOrder) {
    throw new AppError(
      "Payment has already been initiated for this order.",
      StatusCode.BAD_REQUEST
    );
  }

  return url;
};

module.exports = { paymentOrder };
