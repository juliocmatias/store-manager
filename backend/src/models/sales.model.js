const camelize = require('camelize');
const connection = require('./connection');
const { getFormattedColumnNames, 
  getFormattedPlaceholders } = require('../utils/generateFormattedQuery');

const getAllFromDB = async () => {
  const [sales] = await connection.execute(
    `SELECT 
      SP.sale_id,
      JSON_ARRAYAGG(JSON_OBJECT(
          'date', SA.date,
          'productId', SP.product_id,
          'productName', PR.name,
          'quantity', SP.quantity
        )
      ) AS sales
    FROM sales_products as SP
      INNER JOIN sales as SA
      ON SP.sale_id = SA.id
      INNER JOIN products as PR
      ON SP.product_id = PR.id
      GROUP BY SP.sale_id`,
  );
  return camelize(sales);
};

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT 
      SP.sale_id,
      JSON_ARRAYAGG(JSON_OBJECT('date', SA.date,'productId', SP.product_id,
          'productName', PR.name,
          'quantity', SP.quantity
        )
      ) AS sales
    FROM sales_products as SP
      INNER JOIN sales as SA
      ON SP.sale_id = SA.id
      INNER JOIN products as PR
      ON SP.product_id = PR.id
    WHERE SP.sale_id = ?
    GROUP BY SP.sale_id`,
    [id],
  );
  return camelize(sale);
};

const itemSold = async (sales) => {
  const itemsSold = sales.map(async ({ productId, quantity }) => {
    const [[{ productName }]] = await connection.execute(
      'SELECT name as productName FROM products WHERE id = ?',
      [productId],
    );

    return { productId, quantity, productName };
  });

  const result = await Promise.all(itemsSold);

  return result;
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

  const itemsSoldResult = await itemSold(sales);

  return { id: saleID, itemsSold: itemsSoldResult };
};

module.exports = {
  getAllFromDB,
  findById,
  insert,
};