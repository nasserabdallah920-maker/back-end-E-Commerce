const Product = require("../models/product.model");

const saveProduct = async (newProduct) => {
  const product = new Product(newProduct);
  await product.save();
  return product;
};
const findProductById = async (productID) => {
  const product = await Product.findById(productID);
  return product;
};

const findAllProducts = async (page, limit, sort) => {
  const skip = (page - 1) * limit;
  if (page && limit && sort) {
    const sortBy = {};
    if (sort.startsWith("-")) {
      sortBy[sort.slice(1)] = -1;
      const products = await Product.find({})
        .sort(sortBy)
        .skip(skip)
        .limit(limit);
      return products;
    } else {
      sortBy[sort] = 1;
      const products = await Product.find({})
        .sort(sortBy)
        .skip(skip)
        .limit(limit);
      return products;
    }
  }
  const products = await Product.find({})
    .populate("category")
    .skip(skip)
    .limit(limit);
  return products;
};
const findProductBySearch = async (search) => {

  if (!search) return [];
  const products = await Product.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ],
  });

  return products;
};
const deleteProductById = async (productID) => {
  await Product.deleteOne({ _id: productID });
  return;
};

const addProductImageById = async (productID, newData) => {
  const product = await Product.findByIdAndUpdate(
    productID,
    { $push: { images: { $each: newData } } },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  return product;
};
const deleteProductImageById = async (productID, imageName) => {
  const product = await Product.findByIdAndUpdate(
    productID,
    { $pull: { images: imageName } },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  return product;
};
const updateProductById = async (productID, newData, session) => {
  const product = await Product.findByIdAndUpdate(productID, newData, {
    returnDocument: "after",
    runValidators: true,
    session,
  });
  return product;
};

const findProductsByCategory = async (categoryId) => {
  return await Product.find({ category: categoryId });
};


const decrementStock = async (productId, quantity, session) => {
  const product = await Product.findOneAndUpdate(
    { _id: productId, stock: { $gte: quantity } },
    { $inc: { stock: -quantity } },
    { new: true, session }
  );
  return product;
};


const incrementStock = async (productId, quantity, session) => {
  const product = await Product.findOneAndUpdate(
    { _id: productId },
    { $inc: { stock: quantity } },
    { new: true, session }
  );
  return product;
};

module.exports = {
  saveProduct,
  findProductById,
  findAllProducts,
  findProductBySearch,
  findProductsByCategory,
  deleteProductById,
  updateProductById,
  addProductImageById,
  deleteProductImageById,
  decrementStock,
  incrementStock,
};
