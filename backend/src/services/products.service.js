const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllProductsFromDB();

  return { status: 200, data: products };
};

module.exports = {
  getAllProducts,
};