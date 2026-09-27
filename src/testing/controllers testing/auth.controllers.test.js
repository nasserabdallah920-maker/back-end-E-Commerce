const { createUser, login, logOut, refresh } = require("../../controllers/auth.controllers");
const { authServices } = require("../../services/index.services");
const { StatusCode, Status } = require("../../utils/status");

jest.mock("../../services/index.services", () => ({
  authServices: {
    addUser: jest.fn(),
    userLogin: jest.fn(),
    userLogOut: jest.fn(),
    newAccessToken: jest.fn(),
  }
}));

describe("test auth controllers", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      cookies: {},
      user: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("createUser controller", () => {
    it("should successfully create user", async () => {
      req.body = { email: "test@test.com", password: "password", phoneNumber: "01000000000" };
      const mockResult = {
        user: { userId: "1", firstName: "Test", role: "user" },
        accessToken: "access",
        refreshToken: "refresh",
      };
      authServices.addUser.mockResolvedValue(mockResult);

      await createUser(req, res, next);

      expect(authServices.addUser).toHaveBeenCalledWith(req.body);
      expect(res.cookie).toHaveBeenCalledWith("refreshToken", mockResult.refreshToken, { httpOnly: true });
      expect(res.status).toHaveBeenCalledWith(StatusCode.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        success: Status.SUCCESS,
        user: mockResult.user,
        accessToken: mockResult.accessToken,
      });
    });
  });

  describe("login controller", () => {
    it("should successfully login", async () => {
      req.body = { email: "test@test.com", password: "password" };
      const mockResult = {
        user: { userId: "1", firstName: "Test", role: "user" },
        accessToken: "access",
        refreshToken: "refresh",
      };
      authServices.userLogin.mockResolvedValue(mockResult);

      await login(req, res, next);

      expect(authServices.userLogin).toHaveBeenCalledWith(req.body.email, req.body.password);
      expect(res.cookie).toHaveBeenCalledWith("refreshToken", mockResult.refreshToken, { httpOnly: true });
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenCalledWith({
        success: Status.SUCCESS,
        user: mockResult.user,
        accessToken: mockResult.accessToken,
      });
    });
  });

  describe("logOut controller", () => {
    it("should successfully log out", async () => {
      req.user = { id: "1" };
      authServices.userLogOut.mockResolvedValue();

      await logOut(req, res, next);

      expect(authServices.userLogOut).toHaveBeenCalledWith(req.user.id);
      expect(res.clearCookie).toHaveBeenCalledWith("refreshToken");
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenCalledWith({
        success: Status.SUCCESS,
        message: "Logged out successfully",
      });
    });
  });

  describe("refresh controller", () => {
    it("should successfully refresh token", async () => {
      req.cookies = { refreshToken: "refresh_token" };
      const mockResult = { accessToken: "new_access" };
      authServices.newAccessToken.mockResolvedValue(mockResult);

      await refresh(req, res, next);

      expect(authServices.newAccessToken).toHaveBeenCalledWith("refresh_token");
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenCalledWith({
        success: Status.SUCCESS,
        data: { accessToken: mockResult.accessToken },
      });
    });
  });
});
