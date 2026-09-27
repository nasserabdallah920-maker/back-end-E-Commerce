const { getCart, updateItems, updateQuantity, deleteItem, deleteAllItems } = require("../../controllers/cart.controllers");
const cartServices = require("../../services/cart.services");
const { StatusCode, Status } = require("../../utils/status");

jest.mock("../../services/cart.services");

describe("Cart Controllers", () => {
  let req, res, next;

  beforeEach(() => {
    req = { user: { id: "user_1" }, body: {}, params: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("getCart", () => {
    it("should get cart successfully", async () => {
      const mockCart = { userId: "user_1", items: [] };
      cartServices.findUserCart.mockResolvedValue(mockCart);

      await getCart(req, res, next);

      expect(cartServices.findUserCart).toHaveBeenCalledWith("user_1");
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenCalledWith({ success: Status.SUCCESS, data: { cart: mockCart } });
    });
  });

  describe("updateItems", () => {
    it("should update items successfully", async () => {
      req.body = { item: { product: "prod_1", quantity: 2 } };
      const mockCart = { userId: "user_1", items: [req.body.item] };
      cartServices.addNewItem.mockResolvedValue(mockCart);

      await updateItems(req, res, next);

      expect(cartServices.addNewItem).toHaveBeenCalledWith("user_1", req.body.item);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
  });

  describe("deleteAllItems", () => {
    it("should clear all items", async () => {
      cartServices.removeAllItems.mockResolvedValue({});
      
      await deleteAllItems(req, res, next);
      
      expect(cartServices.removeAllItems).toHaveBeenCalledWith("user_1");
      expect(res.status).toHaveBeenCalledWith(StatusCode.NO_CONTENT);
    });
  });
});
