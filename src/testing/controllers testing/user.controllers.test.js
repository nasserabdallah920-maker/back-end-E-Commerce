const { getUser, deleteUser, changeUserPassword, changeUserInformation } = require("../../controllers/user.controllers");
const { userServices } = require("../../services/index.services");
const { StatusCode, Status } = require("../../utils/status");

jest.mock("../../services/index.services", () => ({
  userServices: {
    getUserById: jest.fn(),
    getAll: jest.fn(),
    removeUserById: jest.fn(),
    changeUserInformation: jest.fn(),
    changeUserPassword: jest.fn(),
  }
}));

describe("User Controllers", () => {
  let req, res, next;

  beforeEach(() => {
    req = { user: { id: "user_1" }, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("getUser", () => {
    it("should get user", async () => {
      userServices.getUserById.mockResolvedValue({});
      await getUser(req, res, next);
      expect(userServices.getUserById).toHaveBeenCalledWith("user_1");
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
  });

  describe("deleteUser", () => {
    it("should delete user", async () => {
      userServices.removeUserById.mockResolvedValue();
      await deleteUser(req, res, next);
      expect(userServices.removeUserById).toHaveBeenCalledWith("user_1");
      expect(res.status).toHaveBeenCalledWith(StatusCode.NO_CONTENT);
    });
  });

  describe("changeUserInformation", () => {
    it("should change user info", async () => {
      req.body = { name: "Test" };
      userServices.changeUserInformation.mockResolvedValue({});
      await changeUserInformation(req, res, next);
      expect(userServices.changeUserInformation).toHaveBeenCalledWith("user_1", req.body);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
  });

  describe("changeUserPassword", () => {
    it("should change user password", async () => {
      req.body = { oldPassword: "old", newPassword: "new" };
      userServices.changeUserPassword.mockResolvedValue({});
      await changeUserPassword(req, res, next);
      expect(userServices.changeUserPassword).toHaveBeenCalledWith("user_1", req.body);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
  });
});
