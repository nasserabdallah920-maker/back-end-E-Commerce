const productRepositories = require("../repositories/product.repositories");
const AppError = require("../utils/apperror");
const { StatusCode } = require("../utils/status");

const getAllProducts = async (page, limit, sort) => {
  const products = await productRepositories.findAllProducts(page, limit, sort);
  if (!products) {
    throw new AppError(
      "No products are currently available.",
      StatusCode.NOT_FOUND,
    );
  }
  return products;
};
const getProductById = async (id) => {
  const product = await productRepositories.findProductById(id);
  if (!product) {
    throw new AppError(
      "There is no product with this ID.",
      StatusCode.NOT_FOUND,
    );
  }
  return product;
};
const searchProducts = async (search) => {

  const products = await productRepositories.findProductBySearch(search);
  if (!products) {
    throw new AppError(
      "No product was found in this search.",
      StatusCode.NOT_FOUND,
    );
  }
  return products;
};
const getProductsByCategory = async (categoryId) => {
  const products = await productRepositories.findProductsByCategory(categoryId);

  if (!products) {
    throw new AppError(
      "There is no category with this ID.",
      StatusCode.NOT_FOUND,
    );
  }
  return products;
};
module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
};
