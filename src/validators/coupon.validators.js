const { z } = require('zod');

const createCouponSchema = z.object({
  code: z.string().trim().uppercase(),
  type: z.enum(["fixed", "percentage"]),
  value: z.number().min(1),
  maxDiscount: z.number().min(0),
  minOrder: z.number().min(0),
  expiresAt: z.coerce.date(),
  usageLimit: z.number().min(1),
  isActive: z.boolean().optional(),
}).strict();

const updateCouponSchema = z.object({
  code: z.string().trim().uppercase().optional(),
  type: z.enum(["fixed", "percentage"]).optional(),
  value: z.number().min(1).optional(),
  maxDiscount: z.number().min(0).optional(),
  minOrder: z.number().min(0).optional(),
  expiresAt: z.coerce.date().optional(),
  usageLimit: z.number().min(1).optional(),
  isActive: z.boolean().optional(),
}).strict();

module.exports = { createCouponSchema, updateCouponSchema };