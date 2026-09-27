const userServices = require("../../services/user.services");
const userRepository = require("../../repositories/user.repositories");
const { verifyPassword, hashPassword } = require("../../utils/bcrypt");
const AppError = require("../../utils/apperror");

jest.mock("../../repositories/user.repositories");
jest.mock("../../utils/bcrypt");

describe("User Services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = { id: "user_1", password: "hashedPassword" };

  describe("getUserById", () => {
    it("should get user by id", async () => {
      userRepository.findUserById.mockResolvedValue(mockUser);
      const result = await userServices.getUserById("user_1");
      expect(userRepository.findUserById).toHaveBeenCalledWith("user_1");
      expect(result).toEqual(mockUser);
    });

    it("should throw if user not found", async () => {
      userRepository.findUserById.mockResolvedValue(null);
      await expect(userServices.getUserById("user_1")).rejects.toThrow(AppError);
    });
  });

  describe("removeUserById", () => {
    it("should remove user", async () => {
      userRepository.findUserById.mockResolvedValue(mockUser);
      userRepository.deleteUserById.mockResolvedValue();
      await userServices.removeUserById("user_1");
      expect(userRepository.deleteUserById).toHaveBeenCalledWith("user_1");
    });
  });

  describe("changeUserInformation", () => {
    it("should update user information", async () => {
      userRepository.findUserById.mockResolvedValue(mockUser);
      userRepository.updateUserById.mockResolvedValue({ ...mockUser, name: "New Name" });
      const result = await userServices.changeUserInformation("user_1", { name: "New Name" });
      expect(userRepository.updateUserById).toHaveBeenCalledWith("user_1", { name: "New Name" });
      expect(result.name).toBe("New Name");
    });
  });

  describe("changeUserPassword", () => {
    it("should change user password", async () => {
      userRepository.findUserById.mockResolvedValue(mockUser);
      verifyPassword.mockResolvedValue(true);
      hashPassword.mockResolvedValue("newHashedPassword");
      userRepository.updateUserById.mockResolvedValue({ ...mockUser, password: "newHashedPassword" });
      
      const result = await userServices.changeUserPassword("user_1", { oldPassword: "old", newPassword: "new" });
      expect(userRepository.updateUserById).toHaveBeenCalledWith("user_1", { password: "newHashedPassword" });
      expect(result.password).toBe("newHashedPassword");
    });

    it("should throw if old password incorrect", async () => {
      userRepository.findUserById.mockResolvedValue(mockUser);
      verifyPassword.mockResolvedValue(false);
      
      await expect(userServices.changeUserPassword("user_1", { oldPassword: "old", newPassword: "new" })).rejects.toThrow(AppError);
    });
  });
});
