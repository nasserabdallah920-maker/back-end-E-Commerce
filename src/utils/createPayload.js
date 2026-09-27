const createPayload=(user)=>{
    const payload ={id:user.id,role : user.role}
    return payload
}
module.exports={createPayload}