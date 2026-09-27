const cartRepositories = require("../repositories/cart.repositories");
const productRepositories = require("../repositories/product.repositories");
const AppError = require("../utils/apperror");
const { StatusCode, Status } = require("../utils/status");

const findUserCart = async (id) => {
  const cart = await cartRepositories.findCartByUserId(id);
  if (!cart) {
    throw new AppError("This user has no cart.", StatusCode.NOT_FOUND);
  }
  return cart;
};

const addNewItem = async (userId, item) => {
  const foundProduct = await productRepositories.findProductById(item.product);
  if (!foundProduct) {
    throw new AppError("This product is not available.", StatusCode.NOT_FOUND);
  }

  
  if (item.quantity < 1) {
    throw new AppError(
      "The quantity must be greater than 0",
      StatusCode.BAD_REQUEST,
    );
  }
  const cart = await cartRepositories.findCartByUserId(userId);
  
  if (!cart) {
    const newCart = await cartRepositories.saveCart({ userId, items: [item] });
    return newCart;
  }

  const isfound = cart.items.find(
    (e) => e.product._id.toString() === item.product,
  );

  if (isfound) {
    const quantity = item.quantity || 1;
    const newCart = await cartRepositories.updateQuantity(
      userId,
      item.product,
      quantity,
    );
    return newCart;
  }

  const newCart = await cartRepositories.updateItems(userId, item);
  if (!newCart) {
    throw new AppError(
      "There is a problem saving the item",
      StatusCode.INTERNAL_SERVER_ERROR,
    );
  }
  return newCart;
};

const addNewQuantity = async (userId, productId, quantity) => {
  const cart = await cartRepositories.findCartByUserId(userId);

  if (!cart) {
    throw new AppError("This user does not have a cart", StatusCode.NOT_FOUND);
  }

  const isfound = cart.items.find((e) => e.product._id.toString() === productId);
  if (!isfound) {
    throw new AppError("This product is not in the cart", StatusCode.NOT_FOUND);
  }
  const totalQuantity = Number(quantity) + Number(isfound.quantity);

  if (totalQuantity < 1) {
    throw new AppError(
      "The quantity must be greater than 0",
      StatusCode.BAD_REQUEST,
    );
  }

  const newCart = await cartRepositories.updateQuantity(
    userId,
    productId,
    quantity,
  );
  return newCart;
};

const removeAllItems = async (userId) => {
  const cart = await cartRepositories.findCartByUserId(userId);

  if (!cart) {
    throw new AppError("This user doesn't have a cart", StatusCode.NOT_FOUND);
  }
  const newCart = await cartRepositories.deleteAllItems(userId);
  return newCart;
};
const removeOneItem = async (userId, productID) => {
  const cart = await cartRepositories.findCartByUserId(userId);

  if (!cart) {
    throw new AppError("This user doesn't have a cart", StatusCode.NOT_FOUND);
  }

  const newCart = await cartRepositories.deleteOneItem(userId, productID);

  return newCart;
};
module.exports = {
  findUserCart,
  addNewItem,
  addNewQuantity,
  removeAllItems,
  removeOneItem,
};
