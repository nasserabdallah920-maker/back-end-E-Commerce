const { z } = require("zod");

const createCategorySchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10).optional(),
});

const updateCategorySchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
});

module.exports = { createCategorySchema, updateCategorySchema };