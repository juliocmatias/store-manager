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

  const allProducts = await productsModel.getAllFromDB();

  const productExists = allProducts.find((product) => product.name === name);

  if (productExists) {
    return { status: httpStatusName.INVALID_VALUE, data: { message: 'Product already exists' } };
  }

  const result = await productsModel.insert(name);

  return { status: httpStatusName.CREATED, data: { id: result.insertId, name } };
};

const updateProduct = async (id, name) => {
  const { error } = nameProduct.validate(name);
  if (error) {
    return { 
      status: httpStatusName.INVALID_VALUE, data: { message: error.details[0].message } }; 
  }

  const [result] = await productsModel.update(id, name);

  if (result.affectedRows === 0) {
    return { status: httpStatusName.NOT_FOUND, data: { message: 'Product not found' } };
  }

  return { status: httpStatusName.SUCCESSFUL, data: { id, name } };
};

const deleteProduct = async (id) => {
  const [result] = await productsModel.deleteById(id);

  if (result.affectedRows === 0) {
    return { status: httpStatusName.NOT_FOUND, data: { message: 'Product not found' } };
  }

  return { status: httpStatusName.NO_CONTENT };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
};