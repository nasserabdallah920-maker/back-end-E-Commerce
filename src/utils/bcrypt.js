const bcrypt=require('bcryptjs')

const hashPassword=async(password)=>{
    const salt=Number(process.env.BCRYPT_SALT_ROUNDS)
    const hashedPassword=await bcrypt.hash(password,salt)
    return hashedPassword
}
const verifyPassword=async(password,hashedPassword)=>{
    const verify=await bcrypt.compare(password,hashedPassword)
    return verify
}

module.exports={hashPassword,verifyPassword}