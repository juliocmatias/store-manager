const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.allProducts);

module.exports = route;