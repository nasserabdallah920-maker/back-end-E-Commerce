const { getAllCategories, getCategoryById } = require("../../controllers/category.controllers");
const categoryServices = require("../../services/category.services");
const { StatusCode } = require("../../utils/status");

jest.mock("../../services/category.services");

describe("Category Controllers", () => {
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

  describe("getAllCategoriesController", () => {
    it("should get all categories", async () => {
      req.query = { page: 2, limit: 5 };
      const mockCategories = [{ name: "cat1" }];
      categoryServices.getAllCategories.mockResolvedValue(mockCategories);

      await getAllCategories(req, res, next);

      expect(categoryServices.getAllCategories).toHaveBeenCalledWith(2, 5);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockCategories });
    });
  });

  describe("getCategoryByIdController", () => {
    it("should get category by id", async () => {
      req.params = { id: "cat_1" };
      const mockCategory = { name: "cat1" };
      categoryServices.getCategoryById.mockResolvedValue(mockCategory);

      await getCategoryById(req, res, next);

      expect(categoryServices.getCategoryById).toHaveBeenCalledWith("cat_1");
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockCategory });
    });
  });
});
