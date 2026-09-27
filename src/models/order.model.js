const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    couponCode: {
      type: String,
      default: null,
    },

    shippingAddress: {
      city: String,
      street: String,
      phone: String,
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "card", "pending"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymob_id: { type: Number, default: null },

    shipping: { type: Number, default: 0 },

    totalPrice: {
      type: Number,
      required: true,
    },
    discount: { type: Number, required: true, default: 0 },
    finalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
