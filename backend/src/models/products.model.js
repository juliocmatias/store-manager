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

const insert = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUES (?);',
    [name],
  );
  return result;
};

const update = async (id, name) => connection.execute(
  'UPDATE products SET name = ? WHERE id = ?;',
  [name, id],
);

const deleteById = async (id) => connection.execute(
  'DELETE FROM products WHERE id = ?;',
  [id],
);

module.exports = {
  getAllFromDB,
  findById,
  insert,
  update,
  deleteById,
};