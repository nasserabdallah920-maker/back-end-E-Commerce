const { StatusCode, Status } = require("../utils/status");
const cartServices = require("../services/cart.services");

const getCart = async (req, res, next) => {
  const id = req.user.id;
  const cart = await cartServices.findUserCart(id);
  res
    .status(StatusCode.OK)
    .json({ success: Status.SUCCESS, data: { cart } });
};
const updateItems = async (req, res, next) => {
  const id = req.user.id;
  const {item} = req.body;
  const cart = await cartServices.addNewItem(id, item);

  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: { cart } });
};
const updateQuantity = async (req, res, next) => {
  const id = req.user.id;
  const productId = req.params.productId;
  const {quantity} = req.query;  
  const cart = await cartServices.addNewQuantity(id, productId, quantity);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: { cart } });
};
const deleteItem = async (req, res, next) => {
  const id = req.user.id;
  const productId = req.params.productId;

  const cart = await cartServices.removeOneItem(id, productId);
  res.status(StatusCode.NO_CONTENT).send()
};
const deleteAllItems = async (req, res, next) => {
  const id = req.user.id;


  const cart = await cartServices.removeAllItems(id);
  res.status(StatusCode.NO_CONTENT).send()

};

module.exports = { getCart, updateItems ,updateQuantity,deleteItem,deleteAllItems};
