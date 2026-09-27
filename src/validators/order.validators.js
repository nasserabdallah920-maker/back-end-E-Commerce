const { z } = require("zod");

const createOrderSchema = z.object({
  shippingAddress: z.object({
    city: z.string().min(3),
    street: z.string().min(3),
    phone: z.string().min(11,'must at least 11')}),
  coupon: z.string().optional().nullable(),
});

const updateOrderStatusSchema = z.object({
  newStatus: z.enum([
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
});

module.exports = { createOrderSchema, updateOrderStatusSchema };
