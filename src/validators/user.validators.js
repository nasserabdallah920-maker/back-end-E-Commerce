const { z } = require("zod");

const changePasswordValidate = z
  .object({
    oldPassword: z.string().min(8).max(100),
    newPassword: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const userInformationValidate = z
  .object({
    firstName: z.string().min(3).optional(),
    lastName: z.string().min(3).optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
  })
  .strict();

module.exports = { changePasswordValidate, userInformationValidate };
