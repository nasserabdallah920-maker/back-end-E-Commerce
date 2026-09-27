const { productServices } = require("../services/index.services");
const AppError = require("../utils/apperror");
const { StatusCode, Status } = require("../utils/status");
const getAllProducts = async (req, res, next) => {
  const { page = 1, limit = 10, sort } = req.query;
  const products = await productServices.getAllProducts(page, limit, sort);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: products });
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productServices.getProductById(id);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: product });
};

const searchProducts = async (req, res, next) => {
  const { search } = req.query;
  if (!search) {
    throw new AppError("Search query missing", StatusCode.BAD_REQUEST);
  }
  const results = await productServices.searchProducts(search);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: results });
};

const getProductsByCategory = async (req, res, next) => {
  const { id } = req.params;
  const products = await productServices.getProductsByCategory(id);
  res.status(StatusCode.OK).json({ success: Status.SUCCESS, data: products });
};

module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
};
