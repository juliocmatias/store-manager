const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllProductsFromDB();

  return { status: 'SUCCESSFUL', data: products };
};

module.exports = {
  getAllProducts,
};