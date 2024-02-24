const { productsModel } = require('../models');
const httpName = require('../utils/httpName');

const getAllProducts = async () => {
  const products = await productsModel.getAllFromDB();

  return { status: httpName.SUCCESSFUL, data: products };
};

const getProductById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) return { status: httpName.NOT_FOUND, data: { message: 'Product not found' } };

  return { status: httpName.SUCCESSFUL, data: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};