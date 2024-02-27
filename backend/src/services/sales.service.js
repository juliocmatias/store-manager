const { salesModel } = require('../models');
const httpStatusName = require('../utils/httpStatusName');

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

const insertSale = async (sales) => {
  const sale = await salesModel.insert(sales);

  return { status: httpStatusName.CREATED, data: sale };
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
};