const express=require('express')
const Router = express.Router()
const {cartControllers}=require('../controllers/index.controllers')
const { protect } = require('../middlewares/auth.middleware')
const { validate } = require('../middlewares/validate.middleware');
const { addItemSchema } = require('../validators/cart.validators');
const {asyncWrapper}=require('../utils/wrapper')
Router.use(protect)
Router.get('/',asyncWrapper (cartControllers.getCart))
Router.post('/', validate(addItemSchema), asyncWrapper (cartControllers.updateItems))
Router.patch('/:productId',asyncWrapper (cartControllers.updateQuantity))
Router.delete('/:productId',asyncWrapper (cartControllers.deleteItem))
Router.delete('/',asyncWrapper (cartControllers.deleteAllItems))




module.exports=Router