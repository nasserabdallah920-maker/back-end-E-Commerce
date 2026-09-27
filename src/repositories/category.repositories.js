const Category = require('../models/category.model')


const saveCategory = async(newCategory)=>{
    const category = new Category(newCategory)
    await category.save()
    return category
}

const findCategoryById = async (categoryID) => {
  const category = await Category.findById(categoryID);
  return category;
};


const findAllCategories = async (page, limit) => {
  if (page && limit) {
    const skip = (page - 1) * limit;
    return await Category.find({}).skip(skip).limit(limit);
  }
  return await Category.find({});
};

const deleteCategoryById = async (categoryID) => {
  await Category.deleteOne({ _id: categoryID });
  return;
};

const updateCategoryById = async (categoryID, newData) => {
  const category = await Category.findByIdAndUpdate(categoryID, newData, {
    returnDocument: "after",
    runValidators: true,
  });
  return category;
};

const addCategoryImageById = async (categoryID, newData) => {
  const category = await Category.findByIdAndUpdate(
    categoryID,
    { image:  newData }  ,
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  return category;
};

module.exports={saveCategory,findCategoryById,findAllCategories,deleteCategoryById,updateCategoryById,addCategoryImageById}