const path = require("path");
const productRepositories = require("../../repositories/product.repositories");
const AppError = require("../../utils/apperror");
const fs = require("fs");
const { StatusCode } = require("../../utils/status");
const addProduct = async (body, files) => {
  const { title, description, price, stock, category } = body;
  const newProduct = {
    images: files,
    title,
    description,
    price,
    stock,
    category,
  };
  const product = await productRepositories.saveProduct(newProduct);
  if (!product) {
    throw new AppError(
      "There is a system error. Please try again later.",
      StatusCode.INTERNAL_SERVER_ERROR,
    );
  }
  return product;
};

const removeProductById = async (params) => {
  const id = params.id;
  const product = await productRepositories.findProductById(id);
  if (!product) {
    throw new AppError("This product does not exist", StatusCode.NOT_FOUND);
  }
  await productRepositories.deleteProductById(id);
  return;
};

const updateProductImages = async (id, newphotos) => {
  const update = await productRepositories.addProductImageById(id, newphotos);
  return update;
};
const updateProductInformation = async (productId, body) => {
  const product = await productRepositories.findProductById(productId);

  if (!product) {
    throw new AppError("This product does not exist", StatusCode.NOT_FOUND);
  }
  const newInformation = body;
  const update = await productRepositories.updateProductById(
    productId,
    newInformation,
  );
  return update;
};

const deleteOneImage = async (params) => {
  const { productId, imagesName } = params;

  const product = await productRepositories.findProductById(productId);

  if (!product) {
    throw new AppError("The product does not exist", StatusCode.NOT_FOUND);
  }

  const imageUrl = product.images.find(img => img.includes(imagesName));

  if (!imageUrl) {
    throw new AppError(
      "The image is not found in product",
      StatusCode.NOT_FOUND,
    );
  }

  try {
    const cloudinary = require('cloudinary').v2;
    // Extract public ID from Cloudinary URL: .../upload/v1234/ecommerce/abc.jpg -> ecommerce/abc
    const parts = imageUrl.split('/');
    const filename = parts.pop();
    const publicId = `ecommerce/${filename.split('.')[0]}`;
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err);
  }

  product.images.pull(imageUrl);
  await productRepositories.deleteProductImageById(
    productId,
    imageUrl,
  );

  return product;
};

module.exports = {
  addProduct,
  removeProductById,
  updateProductInformation,
  updateProductImages,
  deleteOneImage,
};
