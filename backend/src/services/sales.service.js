const { salesModel } = require('../models');
const httpStatusName = require('../utils/httpStatusName');
const { quantityProduct } = require('./validations/schemas');
const { productsModel } = require('../models');

const getAllSales = async () => {
  const sales = await salesModel.getAllFromDB();

  return { status: httpStatusName.SUCCESSFUL, data: sales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.findById(id);

  if (sale.length === 0) {
    return { 
      status: httpStatusName.NOT_FOUND, data: { message: 'Sale not found' } }; 
  }

  return { status: httpStatusName.SUCCESSFUL, data: sale };
};

const validateQuantity = (sales) => {
  for (let i = 0; i < sales.length; i += 1) {
    const currentSale = sales[i];
    const { error } = quantityProduct.validate(currentSale.quantity);
    if (error) {
      return { 
        status: httpStatusName.UNPROCESSABLE_ENTITY, 
        data: { message: error.details[0].message }, 
      };
    }
  }

  return null;
};

const validateProductId = async (sales) => {
  const products = await productsModel.getAllFromDB();
  const productsId = products.map((product) => product.id);
  const salesId = sales.map((sale) => sale.productId);
  const productsNotFound = salesId.filter((id) => !productsId.includes(id));
  if (productsNotFound.length > 0) {
    return { 
      status: httpStatusName.NOT_FOUND, 
      data: { message: 'Product not found' }, 
    };
  }

  return null;
};

const insertSale = async (sales) => {
  if (sales.length === 0) {
    return { 
      status: httpStatusName.INVALID_VALUE, 
      data: { message: 'Sale must have at least one product' }, 
    };
  }

  if (!Array.isArray(sales)) {
    return { 
      status: httpStatusName.INVALID_VALUE, 
      data: { message: 'Sale must be an array' }, 
    };
  }

  const validationQuantity = validateQuantity(sales);
  if (validationQuantity) return validationQuantity;

  const validationProductId = await validateProductId(sales);
  if (validationProductId) return validationProductId;

  const sale = await salesModel.insert(sales);

  return { status: httpStatusName.CREATED, data: sale };
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
};