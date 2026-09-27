const {categoryServices}=require('../services/index.services')
const AppError = require('../utils/apperror');
const { StatusCode } = require('../utils/status');


const getAllCategories = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const categories = await categoryServices.getAllCategories(page, limit);
  res.status(StatusCode.OK).json({ success: true, data: categories });
};


const getCategoryById= async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryServices.getCategoryById(id);
  res.status(StatusCode.OK).json({ success: true, data: category });
};

module.exports = {
  getAllCategories,
  getCategoryById,
};
