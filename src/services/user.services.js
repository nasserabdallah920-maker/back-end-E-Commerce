const userRepository = require("../repositories/user.repositories");
const AppError = require("../utils/apperror");
const { verifyPassword, hashPassword } = require("../utils/bcrypt");
const { StatusCode } = require("../utils/status");

const getUserById = async (userId) => {

  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new AppError("This user does not exist", StatusCode.NOT_FOUND);
  }
  return user;
};

const removeUserById = async (userId) => {

  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new AppError("This user does not exist", StatusCode.NOT_FOUND);
  }
  await userRepository.deleteUserById(userId);
  return;
};

const changeUserInformation = async (userId, body) => {

  const user = await userRepository.findUserById(userId);
  const newInformation = body;
  if (!user) {
    throw new AppError("This user does not exist", StatusCode.NOT_FOUND);
  }
  const update = await userRepository.updateUserById(userId, newInformation);
  return update;
};

const changeUserPassword = async (userId, body) => {
  const { oldPassword, newPassword } = body;
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new AppError("This user does not exist", StatusCode.NOT_FOUND);
  }
  const verify = await verifyPassword(oldPassword, user.password);
 
  if (!verify) {
    throw new AppError(
      "The old password is incorrect.",
      StatusCode.BAD_REQUEST,
    );
  }
  const hashNewPassword = await hashPassword(newPassword);
  const update = await userRepository.updateUserById(userId, {
    password: hashNewPassword,
  });
  return update;
};

const addToWishlist = async (userId, productId) => {
  const user = await userRepository.addToWishlist(userId, productId);
  return user.wishlist;
};

const removeFromWishlist = async (userId, productId) => {
  const user = await userRepository.removeFromWishlist(userId, productId);
  return user.wishlist;
};

const getWishlist = async (userId) => {
  const wishlist = await userRepository.getWishlist(userId);
  if (!wishlist) {
    throw new AppError("This user does not exist", StatusCode.NOT_FOUND);
  }
  return wishlist;
};

module.exports = {
  getUserById,
  removeUserById,
  changeUserInformation,
  changeUserPassword,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
