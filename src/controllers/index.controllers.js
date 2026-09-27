const authControllers = require("./auth.controllers");
const userControllers = require("./user.controllers");
const productControllers = require("./product.controllers");
const adminUsersControllers = require("./admin/admin.users.controllers");
const adminProductsControllers = require("./admin/admin.products.controllers");
const adminCategoriesControllers = require("./admin/admin.categories.controllers");
const adminOrdersControllers = require("./admin/admin.orders.controllers");
const adminCouponsControllers = require("./admin/admin.coupons.controllers");
const cartControllers = require("./cart.controllers");
const orderControllers = require("./order.controllers");
const adminDashboardControllers = require("./admin/admin.dashboard.controllers");
const controllers = {
  authControllers,
  userControllers,
  productControllers,
  adminProductsControllers,
  adminUsersControllers,
  adminCategoriesControllers,
  cartControllers,
  orderControllers,
  adminOrdersControllers,
  adminCouponsControllers,
  adminDashboardControllers,
};
module.exports = controllers;
