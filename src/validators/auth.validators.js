const {z}=require("zod")

const registerValidate=z.object({
    firstName:z.string().min(3),
    lastName:z.string().min(3),
    email:z.string().email(),
    password:z.string().min(8).max(100),
    phoneNumber:z.string()
})
const loginValidate=z.object({
    email:z.string().email(),
    password:z.string().min(8).max(100)
})

module.exports={registerValidate,loginValidate}