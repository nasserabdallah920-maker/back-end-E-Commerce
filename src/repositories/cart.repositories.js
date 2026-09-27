const Cart = require("../models/cart.model");

const saveCart = async (newCart) => {
  const cart = new Cart(newCart);
  await cart.save();
  return cart;
};

const findCartByUserId = async (id) => {
  const cart = await Cart.findOne({ userId: id }).populate('items.product');

  return cart;
};

const updateItems = async (userId, newItems) => {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $push: { items: newItems } },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  return cart;
};
const deleteOneItem = async (userId, productID) => {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { product: productID } } },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  return cart;
};
const updateQuantity = async (userId, productID, newQuantity) => {
  const quantity = newQuantity || 1;
  const cart = await Cart.findOneAndUpdate(
    { userId, "items.product": productID },
    { $inc: { "items.$.quantity": quantity } },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  return cart;
};

const deleteAllItems = async (userId,session) => {
  const cart = await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } },{session});
  return cart;
};

const deleteCartById = async (cartID) => {
  await Cart.deleteOne({ _id: cartID });
  return;
};

const updateCartById = async (cartID, newData) => {
  const cart = await Cart.findByIdAndUpdate(cartID, newData, {
    returnDocument: "after",
    runValidators: true,
  });
  return cart;
};

module.exports = {
  saveCart,
  updateItems,
  deleteCartById,
  updateCartById,
  findCartByUserId,
  updateQuantity,
  deleteAllItems,
  deleteOneItem,
};
