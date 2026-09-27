const { getAllProducts, getProductById, searchProducts, getProductsByCategory } = require("../../controllers/product.controllers");
const { productServices } = require("../../services/index.services");
const { StatusCode } = require("../../utils/status");
const AppError = require("../../utils/apperror");

jest.mock("../../services/index.services", () => ({
  productServices: {
    getAllProducts: jest.fn(),
    getProductById: jest.fn(),
    searchProducts: jest.fn(),
    getProductsByCategory: jest.fn(),
  }
}));

describe("Product Controllers", () => {
  let req, res, next;

  beforeEach(() => {
    req = { query: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("getAllProducts", () => {
    it("should get all products", async () => {
      req.query = { page: 1, limit: 10, sort: "desc" };
      productServices.getAllProducts.mockResolvedValue([]);
      await getAllProducts(req, res, next);
      expect(productServices.getAllProducts).toHaveBeenCalledWith(1, 10, "desc");
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
  });

  describe("getProductById", () => {
    it("should get product by id", async () => {
      req.params = { id: "prod_1" };
      productServices.getProductById.mockResolvedValue({});
      await getProductById(req, res, next);
      expect(productServices.getProductById).toHaveBeenCalledWith("prod_1");
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
  });

  describe("searchProducts", () => {
    it("should search products", async () => {
      req.query = { title: "laptop" };
      productServices.searchProducts.mockResolvedValue([]);
      
      await searchProducts(req, res, next);
      expect(productServices.searchProducts).toHaveBeenCalledWith({ title: "laptop", description: undefined, price: undefined });
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });

    it("should throw if no query provided", async () => {
      req.query = {};
      await expect(searchProducts(req, res, next)).rejects.toThrow(AppError);
    });
  });

  describe("getProductsByCategory", () => {
    it("should get products by category", async () => {
      req.params = { id: "cat_1" };
      productServices.getProductsByCategory.mockResolvedValue([]);
      
      await getProductsByCategory(req, res, next);
      expect(productServices.getProductsByCategory).toHaveBeenCalledWith("cat_1");
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
    });
  });
});
