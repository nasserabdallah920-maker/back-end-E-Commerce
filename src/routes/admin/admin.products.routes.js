const express = require("express");
const Router = express.Router();

const {adminProductsControllers} = require("../../controllers/index.controllers");
const { asyncWrapper } = require("../../utils/wrapper");
const { adminOnly } = require("../../middlewares/role.middleware");
const { protect } = require("../../middlewares/auth.middleware");
const uploads=require('../../utils/multer');
const { validate } = require("../../middlewares/validate.middleware");
const { createProductSchema, updateProductSchema } = require("../../validators/product.validators");

Router.use(protect, adminOnly);

Router.post("/create",uploads.array('images'), validate(createProductSchema),asyncWrapper(adminProductsControllers.createProduct));
Router.delete("/delete/:id", asyncWrapper(adminProductsControllers.deleteProduct));
Router.patch("/update/information/:id", validate(updateProductSchema), asyncWrapper(adminProductsControllers.changeProductInformation));
Router.patch("/update/images/:id",uploads.array('images'), asyncWrapper(adminProductsControllers.addProductImage));
Router.delete("/delete/images/:productId/:imagesName", asyncWrapper(adminProductsControllers.deleteImage));

module.exports = Router;
