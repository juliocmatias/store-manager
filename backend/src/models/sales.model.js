const camelize = require('camelize');
const connection = require('./connection');
const { getFormattedColumnNames, 
  getFormattedPlaceholders } = require('../utils/generateFormattedQuery');

const getAllFromDB = async () => {
  const [sales] = await connection.execute(
    `SELECT 
      SP.sale_id,
      SA.date,
      SP.product_id,
      SP.quantity
    FROM sales_products as SP
      INNER JOIN sales as SA
      ON SP.sale_id = SA.id`,
  );
  return camelize(sales);
};

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT 
      SA.date,
      SP.product_id,
      SP.quantity
    FROM sales as SA
      INNER JOIN sales_products as SP
      ON SA.id = SP.sale_id
    WHERE SA.id = ?`,
    [id],
  );
  return camelize(sale);
};

// insert é uma função que recebe um array de objetos, onde cada objeto é um produto
// vendido, contendo o id do produto e a quantidade vendida
// Exemplo:
// [
//   {
//     "productId": 1,
//     "quantity": 1
//   },
//   {
//     "productId": 2,
//     "quantity": 5
//   }
// ]
// A função deve inserir a venda no banco de dados e retornar um objeto com o id da
// venda e os produtos vendidos.
// o retorno do insert é um objeto, onde deve conte o id da venda
// e itemsSold, que é um array de objetos, onde cada objeto é um produto
// vendido, contendo o id do produto e a quantidade vendida
// Exemplo:
// {
//   "id": 3,
//   "itemsSold": [
//     {
//       "productId": 1,
//       "quantity": 1
//     },
//     {
//       "productId": 2,
//       "quantity": 5
//     }
//   ]
// }

const insert = async (sales) => {
  const [{ saleId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [new Date()],
  );
  sales.forEach(async ({ productID, quantity }) => {
    const columns = getFormattedColumnNames({ saleId, productID, quantity });
    const placeholders = getFormattedPlaceholders({ saleId, productID, quantity });
    const query = `INSERT INTO sales_products (${columns}) VALUES (${placeholders})`;
    await connection.execute(
      query,
      [saleId, productID, quantity],
    );
  });

  return { id: saleId, itemsSold: sales };
};

module.exports = {
  getAllFromDB,
  findById,
  insert,
};