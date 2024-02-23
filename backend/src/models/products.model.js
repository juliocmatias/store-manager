const camelize = require('camelize');
const connection = require('./connection');

const getAllProductsFromDB = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(products);
};

module.exports = {
  getAllProductsFromDB,
};