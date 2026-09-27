const { createTokens, verifyRefreshToken } = require("../utils/jwt");
const { createPayload } = require("../utils/createPayload");
const repo = require("../repositories/user.repositories");
const { verifyPassword } = require("../utils/bcrypt");
const AppError = require("../utils/apperror");
const { StatusCode } = require("../utils/status");

const addUser = async (body) => {
  const { firstName, lastName, email, password, phoneNumber } = body;

  const existingUser = await repo.findUserByEmail(email);
  if (existingUser) {
    throw new AppError("Email already exists", StatusCode.CONFLICT);
  }

  const newUser = { firstName, lastName, email, password, phoneNumber };
  const user = await repo.saveUser(newUser);
  const payload = createPayload(user);
  const tokens = createTokens(payload);
  await repo.updateUserById(user._id, { refreshToken: tokens.refreshToken });
  return {
    user: { userId: user._id, firstName: user.firstName, role: user.role },
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

const userLogin = async ( email, password) => {
  const throwAuthError = () => {
    throw new AppError(
      "Incorrect email address or password",
      StatusCode.UNAUTHORIZED,
    );
  };

  const user = await repo.findUserByEmail(email);
  if (!user) throwAuthError();

  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) throwAuthError();
  if(user.isBlocked){throw new AppError('This account has been blocked',StatusCode.UNAUTHORIZED)}

  const payload = createPayload(user);
  const tokens = await createTokens(payload);

  await repo.updateUserById(user._id, { refreshToken: tokens.refreshToken });

  return { 
    user: { userId: user._id, firstName: user.firstName, role: user.role },
    accessToken: tokens.accessToken, 
    refreshToken: tokens.refreshToken 
  };
};

const userLogOut = async (id) => {

  await repo.updateUserById(id, { refreshToken: null });
  return;
};

const newAccessToken = async (refreshToken) => {
  const verify = await verifyRefreshToken(refreshToken);
  if(!verify){
    throw new AppError('Session expired',StatusCode.UNAUTHORIZED)
  }
  const userRefreshToken = await repo.findRefreshTokenByUserId(verify.id);

  if (!userRefreshToken || userRefreshToken !== refreshToken) {
    throw new AppError("Mismatched token", StatusCode.UNAUTHORIZED);
  }
  const payload = { id: verify.id, role: verify.role };
  const tokens = await createTokens(payload);
  return { accessToken: tokens.accessToken ,user:{userId:verify.id,role:verify.role}};
};

module.exports = { userLogin, addUser, userLogOut, newAccessToken };
