const cartServices = require("../../services/cart.services");
const cartRepositories = require("../../repositories/cart.repositories");
const productRepositories = require("../../repositories/product.repositories");
const AppError = require("../../utils/apperror");

jest.mock("../../repositories/cart.repositories");
jest.mock("../../repositories/product.repositories");

describe("Cart Services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockCart = { userId: "user_1", items: [{ product: { _id: "prod_1", toString: () => "prod_1" }, quantity: 1 }] };
  const mockProduct = { _id: "prod_1" };

  describe("findUserCart", () => {
    it("should return cart if found", async () => {
      cartRepositories.findCartByUserId.mockResolvedValue(mockCart);
      const result = await cartServices.findUserCart("user_1");
      expect(result).toEqual(mockCart);
    });

    it("should throw error if cart not found", async () => {
      cartRepositories.findCartByUserId.mockResolvedValue(null);
      await expect(cartServices.findUserCart("user_1")).rejects.toThrow(AppError);
    });
  });

  describe("addNewItem", () => {
    it("should add new item if cart doesn't exist", async () => {
      productRepositories.findProductById.mockResolvedValue(mockProduct);
      cartRepositories.findCartByUserId.mockResolvedValue(null);
      cartRepositories.saveCart.mockResolvedValue({ userId: "user_1", items: [{ product: "prod_1", quantity: 1 }] });

      const result = await cartServices.addNewItem("user_1", { product: "prod_1", quantity: 1 });
      expect(cartRepositories.saveCart).toHaveBeenCalledWith({ userId: "user_1", items: [{ product: "prod_1", quantity: 1 }] });
      expect(result).toBeDefined();
    });

    it("should throw error if product not available", async () => {
      productRepositories.findProductById.mockResolvedValue(null);
      await expect(cartServices.addNewItem("user_1", { product: "prod_1", quantity: 1 })).rejects.toThrow(AppError);
    });
  });

  describe("removeAllItems", () => {
    it("should clear cart items", async () => {
      cartRepositories.findCartByUserId.mockResolvedValue(mockCart);
      cartRepositories.deleteAllItems.mockResolvedValue({ userId: "user_1", items: [] });
      const result = await cartServices.removeAllItems("user_1");
      expect(cartRepositories.deleteAllItems).toHaveBeenCalledWith("user_1");
      expect(result.items).toHaveLength(0);
    });
  });

  describe("removeOneItem", () => {
    it("should remove specific item", async () => {
      cartRepositories.findCartByUserId.mockResolvedValue(mockCart);
      cartRepositories.deleteOneItem.mockResolvedValue({ userId: "user_1", items: [] });
      const result = await cartServices.removeOneItem("user_1", "prod_1");
      expect(cartRepositories.deleteOneItem).toHaveBeenCalledWith("user_1", "prod_1");
      expect(result).toBeDefined();
    });
  });
});
