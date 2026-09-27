const orderServices = require("../../services/order.services");
const cartRepositories = require("../../repositories/cart.repositories");
const orderRepositories = require("../../repositories/order.repositories");
const couponRepositories = require("../../repositories/coupon.repositories");
const productRepositories = require("../../repositories/product.repositories");
const AppError = require("../../utils/apperror");

jest.mock("../../repositories/cart.repositories");
jest.mock("../../repositories/order.repositories");
jest.mock("../../repositories/coupon.repositories");
jest.mock("../../repositories/product.repositories");
jest.mock("../../utils/checkdate", () => jest.fn(() => false));
jest.mock("../../utils/calculatediscount", () => jest.fn(() => 50));

describe("Order Services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockCart = {
    userId: "user_1",
    items: [
      { product: { _id: "prod_1", title: "Product 1", price: 100 }, quantity: 1 }
    ]
  };

  describe("createOrder", () => {

    it("should throw if user has no cart", async () => {
      cartRepositories.findCartByUserId.mockResolvedValue(null);
      await expect(orderServices.createOrder("user_1", {})).rejects.toThrow(AppError);
    });
  });

  describe("getOrderById", () => {
    it("should get order by id", async () => {
      orderRepositories.findOrderById.mockResolvedValue({ id: "order_1" });
      const result = await orderServices.getOrderById("order_1");
      expect(result).toBeDefined();
    });
  });

  describe("getUserOrdersById", () => {
    it("should get user orders", async () => {
      orderRepositories.findOrdersForUser.mockResolvedValue([]);
      const result = await orderServices.getUserOrdersById("user_1");
      expect(result).toBeDefined();
    });
  });
});
