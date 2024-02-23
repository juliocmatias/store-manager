const mapStatusHTTPS = require('../utils/mapStatusHTTP');
const { productsService } = require('../services');

const allProducts = async (_req, res) => {
  const { status, data } = await productsService.getAllProducts();

  return res.status(mapStatusHTTPS(status)).json(data);
};

module.exports = {
  allProducts,
};