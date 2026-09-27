const { adminCategoriesServices } = require("../../services/index.services");
const AppError = require("../../utils/apperror");
const { Status, StatusCode } = require("../../utils/status");

const createCategory = async (req, res, next) => {
  const image = req.file.path;
  const body = req.body;
  const category = await adminCategoriesServices.addCategory(body, image);
  if (!category) {
    throw new AppError("error in save", StatusCode.INTERNAL_SERVER_ERROR);
  }
  res
    .status(StatusCode.CREATED)
    .json({ success: Status.SUCCESS, data: category });
};

const deleteCategory = async (req, res, next) => {
  const params = req.params;
  await adminCategoriesServices.removeCategoryById(params);
  res.status(StatusCode.NO_CONTENT).send()
};

const changeCategoryInformation = async (req, res, next) => {
  const categoryId = req.params.id;
  const body = req.body;

  const change = await adminCategoriesServices.updateCategoryInformation(
    categoryId,
    body,
  );

  res
    .status(StatusCode.OK)
    .json({ success: Status.SUCCESS, data: { category: change } });
};
const addProductImage = async (req, res, next) => {
  const categoryId = req.params.id;
  const file = req.file;
  const arr = file.path;

  const change = await adminCategoriesServices.updateCategoryImages(categoryId, arr);

  res
    .status(StatusCode.OK)
    .json({ success: Status.SUCCESS, data: { category: change } });
};
module.exports = { createCategory, deleteCategory, changeCategoryInformation ,addProductImage};
