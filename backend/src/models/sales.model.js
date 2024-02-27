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

const insert = async (sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [new Date()],
  );

  const saleID = insertId;

  const promises = sales.map(async (sale) => {
    const columns = getFormattedColumnNames({ saleID, ...sale });
    const placeholders = getFormattedPlaceholders({ saleID, ...sale });
    const query = `INSERT INTO sales_products (${columns}) VALUES (${placeholders})`;
    await connection.execute(query, [saleID, ...Object.values(sale)]);
  });

  await Promise.all(promises);

  return { id: saleID, itemsSold: sales };
};

module.exports = {
  getAllFromDB,
  findById,
  insert,
};