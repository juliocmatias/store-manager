const route = require('express').Router();
const { productsController } = require('../controllers');
const validateRegisterProduct = require('../middlewares/validateRegisterProduct');

route.get('/', productsController.allProducts);
route.get('/:id', productsController.productById);
route.post('/', validateRegisterProduct, productsController.insert);

module.exports = route;