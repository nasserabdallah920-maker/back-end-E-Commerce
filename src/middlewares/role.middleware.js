const AppError = require("../utils/apperror");
const { StatusCode } = require("../utils/status");

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    throw new AppError("You do not have authority to perform this action", StatusCode.FORBIDDEN);
  }
  return next();
};
module.exports = { adminOnly };
