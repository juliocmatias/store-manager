const mapStatusHTTPS = require('../utils/mapStatusHTTP');
const { salesService } = require('../services');

const allSales = async (_req, res) => {
  const { status, data } = await salesService.getAllSales();

  return res.status(mapStatusHTTPS(status)).json(data);
};

const saleById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await salesService.getSaleById(id);

  return res.status(mapStatusHTTPS(status)).json(data);
};

const insertSaleProducts = async (req, res) => {
  const { sales } = req.body;

  const { status, data } = await salesService.insertSale(sales);

  return res.status(mapStatusHTTPS(status)).json(data);
};

module.exports = {
  allSales,
  saleById,
  insertSaleProducts,
};