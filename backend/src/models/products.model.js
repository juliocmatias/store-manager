const camelize = require('camelize');
const connection = require('./connection');

const getAllFromDB = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products;',
  );
  return camelize(products);
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );
  return camelize(product);
};

module.exports = {
  getAllFromDB,
  findById,
};