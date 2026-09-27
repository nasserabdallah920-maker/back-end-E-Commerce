const AppError = require("../utils/apperror");
const { verifyAccessToken } = require("../utils/jwt");
const { StatusCode } = require("../utils/status");
const { asyncWrapper } = require("../utils/wrapper");
const User = require("../models/user.model");

const protect =asyncWrapper( async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(
      new AppError("The token was not found", StatusCode.UNAUTHORIZED),
    );
  }
  const payload = await verifyAccessToken(token);


  const user = await User.findById(payload.id);
  if (!user) {
    return next(new AppError("User not found", StatusCode.UNAUTHORIZED));
  }
  if (user.isBlocked) {
    return next(new AppError("User is blocked", StatusCode.FORBIDDEN));
  }

  req.user = payload;

  next();
})

module.exports = { protect };
