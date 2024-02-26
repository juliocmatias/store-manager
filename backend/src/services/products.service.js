const { productsModel } = require('../models');
const httpStatusName = require('../utils/httpStatusName');
const { nameProduct } = require('./validations/schemas');

const getAllProducts = async () => {
  const products = await productsModel.getAllFromDB();

  return { status: httpStatusName.SUCCESSFUL, data: products };
};

const getProductById = async (id) => {
  const product = await productsModel.findById(id);

  if (!product) return { status: httpStatusName.NOT_FOUND, data: { message: 'Product not found' } };

  return { status: httpStatusName.SUCCESSFUL, data: product };
};

const insertProduct = async (name) => {
  const { error } = nameProduct.validate(name);
  if (error) {
    return { 
      status: httpStatusName.INVALID_VALUE, data: { message: error.details[0].message } }; 
  }

  const result = await productsModel.insert(name);

  return { status: httpStatusName.CREATED, data: { id: result.insertId, name } };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
};