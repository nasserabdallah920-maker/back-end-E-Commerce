const { authServices } = require("../../services/index.services");
const userRepositories = require("../../repositories/user.repositories");
const { createTokens, verifyRefreshToken } = require("../../utils/jwt");
const { verifyPassword } = require("../../utils/bcrypt");
const AppError = require("../../utils/apperror");
const { StatusCode } = require("../../utils/status");

jest.mock("../../repositories/user.repositories.js");
jest.mock("../../utils/jwt.js");
jest.mock("../../utils/bcrypt.js");

const mockUser = {
  firstName: "UserName",
  lastName: "lastName",
  email: "user@gmail.com",
  password: "hashedPassword",
  phoneNumber: "01000000000",
  role: "admin",
  _id: "user_1",
  refreshToken: "oldRefreshToken"
};
const tokens = { accessToken: "accessToken", refreshToken: "refreshToken" };

describe("test auth services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addUser service", () => {
    it("successfully add", async () => {
      userRepositories.findUserByEmail.mockResolvedValue(null);
      userRepositories.saveUser.mockResolvedValue(mockUser);
      createTokens.mockReturnValue(tokens);
      userRepositories.updateUserById.mockResolvedValue();

      const result = await authServices.addUser(mockUser);

      expect(userRepositories.findUserByEmail).toHaveBeenCalledWith(mockUser.email);
      expect(userRepositories.saveUser).toHaveBeenCalled();
      expect(createTokens).toHaveBeenCalled();
      expect(userRepositories.updateUserById).toHaveBeenCalledWith(mockUser._id, { refreshToken: tokens.refreshToken });
      expect(result).toEqual({
        user: {
          userId: mockUser._id,
          firstName: mockUser.firstName,
          role: mockUser.role,
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    });

    it("throws AppError if email already exists", async () => {
      userRepositories.findUserByEmail.mockResolvedValue(mockUser);

      await expect(authServices.addUser(mockUser)).rejects.toThrow(AppError);
      expect(userRepositories.findUserByEmail).toHaveBeenCalledWith(mockUser.email);
      expect(userRepositories.saveUser).not.toHaveBeenCalled();
    });
  });

  describe("userLogin service", () => {
    it("successfully login", async () => {
      userRepositories.findUserByEmail.mockResolvedValue(mockUser);
      verifyPassword.mockResolvedValue(true);
      createTokens.mockResolvedValue(tokens);
      userRepositories.updateUserById.mockResolvedValue();

      const result = await authServices.userLogin("user@gmail.com", "password123");

      expect(userRepositories.findUserByEmail).toHaveBeenCalledWith("user@gmail.com");
      expect(verifyPassword).toHaveBeenCalledWith("password123", mockUser.password);
      expect(createTokens).toHaveBeenCalled();
      expect(userRepositories.updateUserById).toHaveBeenCalledWith(mockUser._id, { refreshToken: tokens.refreshToken });
      expect(result).toEqual({
        user: {
          userId: mockUser._id,
          firstName: mockUser.firstName,
          role: mockUser.role,
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    });

    it("throws AppError on incorrect email", async () => {
      userRepositories.findUserByEmail.mockResolvedValue(null);

      await expect(authServices.userLogin("wrong@gmail.com", "password123")).rejects.toThrow(AppError);
    });

    it("throws AppError on incorrect password", async () => {
      userRepositories.findUserByEmail.mockResolvedValue(mockUser);
      verifyPassword.mockResolvedValue(false);

      await expect(authServices.userLogin("user@gmail.com", "wrongpassword")).rejects.toThrow(AppError);
    });
  });

  describe("userLogOut service", () => {
    it("successfully logout", async () => {
      userRepositories.updateUserById.mockResolvedValue();

      await authServices.userLogOut(mockUser._id);

      expect(userRepositories.updateUserById).toHaveBeenCalledWith(mockUser._id, { refreshToken: null });
    });
  });

  describe("newAccessToken service", () => {
    it("successfully generates new access token", async () => {
      verifyRefreshToken.mockResolvedValue({ id: mockUser._id, role: mockUser.role });
      userRepositories.findRefreshTokenByUserId.mockResolvedValue( "validRefreshToken" );
      createTokens.mockResolvedValue({ accessToken: "newAccessToken", refreshToken: "validRefreshToken" });

      const result = await authServices.newAccessToken("validRefreshToken");

      expect(verifyRefreshToken).toHaveBeenCalledWith("validRefreshToken");
      expect(userRepositories.findRefreshTokenByUserId).toHaveBeenCalledWith(mockUser._id);
      expect(createTokens).toHaveBeenCalledWith({ id: mockUser._id, role: mockUser.role });
      expect(result).toEqual({ accessToken: "newAccessToken" });
    });

    it("throws AppError on mismatched token", async () => {
      verifyRefreshToken.mockResolvedValue({ id: mockUser._id, role: mockUser.role });
      userRepositories.findUserById.mockResolvedValue({ ...mockUser, refreshToken: "differentToken" });

      await expect(authServices.newAccessToken("invalidToken")).rejects.toThrow(AppError);
    });
  });
});
