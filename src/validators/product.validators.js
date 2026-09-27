const { z } = require("zod");

const createProductSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(1, "Description is required"),
  price: z.string().transform(Number).pipe(z.number().min(0, "Price cannot be negative")),
  stock: z.string().transform(Number).pipe(z.number().min(0, "Stock cannot be negative")),
  category: z.string(),
});

const updateProductSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.string().transform(Number).pipe(z.number().min(0, "Price cannot be negative")).optional(),
  stock: z.string().transform(Number).pipe(z.number().min(0, "Stock cannot be negative")).optional(),
  category: z.string().optional(),
});

module.exports = { createProductSchema, updateProductSchema };