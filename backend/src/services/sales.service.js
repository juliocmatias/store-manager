const { salesModel } = require('../models');
const httpStatusName = require('../utils/httpStatusName');
const { quantityProduct } = require('./validations/schemas');

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

const insertSale = async (sales) => {
  const validation = validateQuantity(sales);
  if (validation) return validation;

  const sale = await salesModel.insert(sales);

  return { status: httpStatusName.CREATED, data: sale };
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
};