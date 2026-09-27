const express = require("express");
const Router = express.Router();
const {adminCategoriesControllers} = require("../../controllers/index.controllers");
const uploads = require("../../utils/multer");
const { validate } = require("../../middlewares/validate.middleware");
const { createCategorySchema, updateCategorySchema } = require("../../validators/category.validators");
const {asyncWrapper}=require('../../utils/wrapper')
const { adminOnly } = require("../../middlewares/role.middleware");
const { protect } = require("../../middlewares/auth.middleware");
Router.use(protect,adminOnly)
Router.post("/create",uploads.single("image"),validate(createCategorySchema),asyncWrapper(adminCategoriesControllers.createCategory))
Router.delete("/delete/:id", asyncWrapper(adminCategoriesControllers.deleteCategory))
Router.patch("/update/information/:id",validate(updateCategorySchema),asyncWrapper(adminCategoriesControllers.changeCategoryInformation))
Router.patch("/update/image/:id",uploads.single('image'), asyncWrapper(adminCategoriesControllers.addProductImage));

module.exports = Router;
