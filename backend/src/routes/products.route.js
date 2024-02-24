const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.allProducts);
route.get('/:id', productsController.productById);

module.exports = route;