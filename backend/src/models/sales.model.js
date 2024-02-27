const camelize = require('camelize');
const connection = require('./connection');

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
const insert = async (sales) => {
  // insertSaleId pega o id da venda que foi inserida 
  const insertSaleId = [];
  sales.forEach(async (sale) => {
    const currentDate = new Date();
    const [result] = await connection.execute(
      'INSERT INTO sales (date) VALUES (?);',
      [currentDate],
    );
    insertSaleId.push(result.insertId);
  });
};

module.exports = {
  getAllFromDB,
  findById,
};