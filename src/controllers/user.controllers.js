const {userServices}=require('../services/index.services')
const { StatusCode, Status } = require("../utils/status");

const getUser = async (req, res, next) => {
  const userId = req.user.id;
  const result = await userServices.getUserById(userId);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: result });
};


const deleteUser = async (req, res, next) => {
  const id = req.user.id;
  await userServices.removeUserById(id);
  res.status(StatusCode.NO_CONTENT).send()
};
const changeUserInformation = async (req, res, next) => {
  const userId = req.user.id;
  const body = req.body;
  const change = await userServices.changeUserInformation(userId,body);

  res
    .status(StatusCode.OK)
    .json({ success: Status.SUCCESS, data: { user: change } });
};
const changeUserPassword = async (req, res, next) => {
  const userId=req.user.id
  const body = req.body;
  const change = await userServices.changeUserPassword(userId, body);

  res
    .status(StatusCode.OK)
    .json({ success: Status.SUCCESS, data: { user: change } });
};

const addToWishlist = async (req, res, next) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const wishlist = await userServices.addToWishlist(userId, productId);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: { wishlist } });
};

const removeFromWishlist = async (req, res, next) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const wishlist = await userServices.removeFromWishlist(userId, productId);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: { wishlist } });
};

const getWishlist = async (req, res, next) => {
  const userId = req.user.id;
  const wishlist = await userServices.getWishlist(userId);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: { wishlist } });
};

module.exports = { getUser, deleteUser, changeUserPassword,changeUserInformation, addToWishlist, removeFromWishlist, getWishlist };
