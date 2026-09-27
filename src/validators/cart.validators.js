const { z } = require("zod");

const addItemSchema = z.object({
  item: z.object({
    product: z.string(),
    quantity: z.number().min(1).optional(),
  })
});

module.exports = { addItemSchema };
