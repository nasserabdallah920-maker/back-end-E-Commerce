const axios  = require("axios")
const url = process.env.PAYMOB_BASE_URL
const paymob = axios.create({baseURL:url})

module.exports=paymob