const userServices = require("./user.services");
const adminUsersServices = require("./admin/admin.users.services");
const adminProductsServices = require("./admin/admin.products.services");
const adminCategoriesServices = require("./admin/admin.categories.services");
const adminOrderServices = require("./admin/admin.orders.services");
const adminCouponsServices = require("./admin/admin.coupons.services");
const authServices = require("./auth.services");
const productServices = require("./product.services");
const orderServices = require("./order.services");
const cartServices = require("./cart.services");
const categoryServices = require("./category.services");
const adminDashboardServices = require("./admin/admin.dashboard.services");

const services = {
  userServices,
  productServices,
  authServices,
  adminProductsServices,
  adminUsersServices,
  adminCategoriesServices,
  orderServices,
  adminOrderServices,
  adminCouponsServices,
  categoryServices,
  cartServices,
  adminDashboardServices,
};

module.exports = services;
