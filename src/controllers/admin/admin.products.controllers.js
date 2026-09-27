const {adminProductsServices} = require("../../services/index.services");
const AppError = require("../../utils/apperror");
const { Status, StatusCode } = require("../../utils/status");

const createProduct = async (req, res, next) => {
  const files = req.files;
  const body = req.body;
  const arr = files.map((e) => e.path);
  const product = await adminProductsServices.addProduct(body, arr);
  if (!product) {
    throw new AppError("error in save", StatusCode.INTERNAL_SERVER_ERROR);
  }
  res.status(StatusCode.CREATED).json({ success:Status.SUCCESS,data:product});
};
const deleteProduct = async (req, res, next) => {
  const params = req.params;
  await adminProductsServices.removeProductById(params);
  res.status(StatusCode.NO_CONTENT).send()
};

const addProductImage = async (req, res, next) => {
  const productId = req.params.id;
  const files = req.files;
  const arr = files.map((e) => e.path);

  const change = await adminProductsServices.updateProductImages(productId, arr);

  res
    .status(StatusCode.OK)
    .json({ success: Status.SUCCESS, data: { product: change } });
};
const changeProductInformation = async (req, res, next) => {
  const productId = req.params.id;
  const body = req.body;

  const change = await adminProductsServices.updateProductInformation(productId, body);

  res
    .status(StatusCode.OK)
    .json({ success: Status.SUCCESS, data: { product: change } });
};


const deleteImage=async(req,res,next)=>{
    const params=req.params
    const product =await adminProductsServices.deleteOneImage(params)
    res.status(StatusCode.NO_CONTENT).send()
}
module.exports = { createProduct, deleteProduct, changeProductInformation,addProductImage,deleteImage };
