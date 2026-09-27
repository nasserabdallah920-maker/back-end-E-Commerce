const productServices = require("../../services/product.services");
const productRepositories = require("../../repositories/product.repositories");
const AppError = require("../../utils/apperror");

jest.mock("../../repositories/product.repositories");

describe("Product Services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllProducts", () => {
    it("should get all products", async () => {
      productRepositories.findAllProducts.mockResolvedValue([]);
      const result = await productServices.getAllProducts(1, 10, "asc");
      expect(productRepositories.findAllProducts).toHaveBeenCalledWith(1, 10, "asc");
      expect(result).toBeDefined();
    });
  });

  describe("getProductById", () => {
    it("should get product by id", async () => {
      productRepositories.findProductById.mockResolvedValue({ id: "prod_1" });
      const result = await productServices.getProductById("prod_1");
      expect(productRepositories.findProductById).toHaveBeenCalledWith("prod_1");
      expect(result).toBeDefined();
    });
  });

  describe("searchProducts", () => {
    it("should search products", async () => {
      productRepositories.findProductBySearch.mockResolvedValue([]);
      const result = await productServices.searchProducts({ title: "test" });
      expect(productRepositories.findProductBySearch).toHaveBeenCalledWith({ title: "test" });
      expect(result).toBeDefined();
    });
  });

  describe("getProductsByCategory", () => {
    it("should get products by category", async () => {
      productRepositories.findProductsByCategory.mockResolvedValue([]);
      const result = await productServices.getProductsByCategory("cat_1");
      expect(productRepositories.findProductsByCategory).toHaveBeenCalledWith("cat_1");
      expect(result).toBeDefined();
    });
  });
});
