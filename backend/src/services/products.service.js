const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllFromDB();

  return { status: 'SUCCESSFUL', data: products };
};

const getProductById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};