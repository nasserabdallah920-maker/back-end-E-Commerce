const { order, getOneOrder, getUserOrders, cancelOneOrder } = require("../../controllers/order.controllers");
const { orderServices } = require("../../services/index.services");
const { StatusCode, Status } = require("../../utils/status");

jest.mock("../../services/index.services", () => ({
  orderServices: {
    createOrder: jest.fn(),
    getUserOrdersById: jest.fn(),
    getUserOrder: jest.fn(),
    changeOrderStatus: jest.fn(),
    cancelUserOrder: jest.fn(),
  }
}));

describe("Order Controllers", () => {
  let req, res, next;

  beforeEach(() => {
    req = { user: { id: "user_1" }, body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("order", () => {
    it("should create order", async () => {
      req.body = { shippingAddress: "addr", paymentMethod: "cash", coupon: null };
      orderServices.createOrder.mockResolvedValue({ id: "order_1" });

      await order(req, res, next);
      expect(orderServices.createOrder).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
  });

  describe("getUserOrders", () => {
    it("should get user orders", async () => {
      orderServices.getUserOrdersById.mockResolvedValue([]);
      await getUserOrders(req, res, next);
      expect(orderServices.getUserOrdersById).toHaveBeenCalledWith("user_1");
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
  });

  describe("getOneOrder", () => {
    it("should get one order", async () => {
      req.params.orderId = "order_1";
      orderServices.getUserOrder.mockResolvedValue({});
      await getOneOrder(req, res, next);
      expect(orderServices.getUserOrder).toHaveBeenCalledWith("order_1", "user_1");
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
  });

  describe("cancelOneOrder", () => {
    it("should cancel one order", async () => {
      req.params.orderId = "order_1";
      orderServices.cancelUserOrder.mockResolvedValue({});
      await cancelOneOrder(req, res, next);
      expect(orderServices.cancelUserOrder).toHaveBeenCalledWith("order_1", "user_1");
      expect(res.status).toHaveBeenCalledWith(StatusCode.NO_CONTENT);
    });
  });
});
