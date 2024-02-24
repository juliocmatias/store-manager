const mapStatusHTTPS = require('../utils/mapStatusHTTP');
const { productsService } = require('../services');

const allProducts = async (_req, res) => {
  const { status, data } = await productsService.getAllProducts();

  return res.status(mapStatusHTTPS(status)).json(data);
};

const productById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await productsService.getProductById(id);

  return res.status(mapStatusHTTPS(status)).json(data);
}; 

module.exports = {
  allProducts,
  productById,
};