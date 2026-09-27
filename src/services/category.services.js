const categoryRepositories = require('../repositories/category.repositories');
const AppError = require('../utils/apperror');
const { StatusCode } = require('../utils/status');

const getAllCategories = async (page, limit) => {
  const categories = await categoryRepositories.findAllCategories(page, limit);
  if (!categories) {
    throw new AppError('No categories found.', StatusCode.NOT_FOUND);
  }
  return categories;
};

const getCategoryById = async (id) => {
  const category = await categoryRepositories.findCategoryById(id);
  if (!category) {
    throw new AppError('Category not found.', StatusCode.NOT_FOUND);
  }
  return category;
};

module.exports = { getAllCategories, getCategoryById };
