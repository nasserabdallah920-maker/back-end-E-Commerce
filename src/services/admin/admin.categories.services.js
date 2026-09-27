const categoryRepositories = require("../../repositories/category.repositories");
const AppError = require("../../utils/apperror");

const { StatusCode } = require("../../utils/status");
const addCategory = async (body,image) => {
  const { name, description } = body;
  const newCategory = {
    name,
    description,
    image,
  };
  const category = await categoryRepositories.saveCategory(newCategory)
  if (!category) {
    throw new AppError(
      "There is a system error. Please try again later.",
      StatusCode.INTERNAL_SERVER_ERROR,
    );
  }
  
  return category;
};

const removeCategoryById = async (params) => {
  const id = params.id;
  const category = await categoryRepositories.findCategoryById(id);
  if (!category) {
    throw new AppError("This category does not exist", StatusCode.NOT_FOUND);
  }
  await categoryRepositories.deleteCategoryById(id);
  return;
};

const updateCategoryInformation = async (categoryId, body) => {
  const category = await categoryRepositories.findCategoryById(categoryId);

  if (!category) {
    throw new AppError("This category does not exist", StatusCode.NOT_FOUND);
  }
  const newInformation = body;
  const update = await categoryRepositories.updateCategoryById(
    categoryId,
    newInformation,
  );
  return update;
};
const updateCategoryImages = async (id, newphotos) => {
  const update = await categoryRepositories.addCategoryImageById(id, newphotos);
  return update;
};
module.exports={addCategory,removeCategoryById,updateCategoryInformation,updateCategoryImages}
