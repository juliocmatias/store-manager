const { productsModel } = require('../models');
const httpStatusName = require('../utils/httpStatusName');

const getAllProducts = async () => {
  const products = await productsModel.getAllFromDB();

  return { status: httpStatusName.SUCCESSFUL, data: products };
};

const getProductById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) return { status: httpStatusName.NOT_FOUND, data: { message: 'Product not found' } };

  return { status: httpStatusName.SUCCESSFUL, data: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};