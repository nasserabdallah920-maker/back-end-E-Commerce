const jwt = require("jsonwebtoken");
const AppError = require("./apperror");
const { StatusCode } = require("./status");

const createTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    return decoded;
  } catch (err) {
    throw new AppError("Invalid token", StatusCode.UNAUTHORIZED);
  }
};

const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    return decoded;
  } catch (err) {
    throw new AppError("Invalid token", StatusCode.UNAUTHORIZED);
  }
};

module.exports = { createTokens, verifyAccessToken, verifyRefreshToken };
