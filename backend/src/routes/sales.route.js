const route = require('express').Router();
const { salesController } = require('../controllers');
const validateRegisterSales = require('../middlewares/validateRegisterSales');

route.get('/', salesController.allSales);
route.get('/:id', salesController.saleById);
route.post('/', validateRegisterSales, salesController.insertSaleProducts);

module.exports = route;