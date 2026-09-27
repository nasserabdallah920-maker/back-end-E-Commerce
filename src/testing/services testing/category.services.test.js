const { getAllCategories, getCategoryById } = require("../../services/category.services");
const categoryRepositories = require("../../repositories/category.repositories");
const AppError = require("../../utils/apperror");

jest.mock("../../repositories/category.repositories");

describe("Category Services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllCategories", () => {
    it("should return categories", async () => {
      const mockCategories = [{ _id: "cat_1", name: "Electronics" }];
      categoryRepositories.findAllCategories.mockResolvedValue(mockCategories);

      const result = await getAllCategories(1, 10);
      expect(categoryRepositories.findAllCategories).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual(mockCategories);
    });

    it("should throw if no categories found", async () => {
      categoryRepositories.findAllCategories.mockResolvedValue(null);
      await expect(getAllCategories(1, 10)).rejects.toThrow(AppError);
    });
  });

  describe("getCategoryById", () => {
    it("should return category by ID", async () => {
      const mockCategory = { _id: "cat_1", name: "Electronics" };
      categoryRepositories.findCategoryById.mockResolvedValue(mockCategory);

      const result = await getCategoryById("cat_1");
      expect(categoryRepositories.findCategoryById).toHaveBeenCalledWith("cat_1");
      expect(result).toEqual(mockCategory);
    });

    it("should throw if category not found", async () => {
      categoryRepositories.findCategoryById.mockResolvedValue(null);
      await expect(getCategoryById("invalid")).rejects.toThrow(AppError);
    });
  });
});
