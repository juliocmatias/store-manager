const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.allSales);
route.get('/:id', salesController.saleById);
route.post('/', salesController.insertSaleProducts);

module.exports = route;