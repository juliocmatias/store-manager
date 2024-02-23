const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.getAllSales);

module.exports = route;