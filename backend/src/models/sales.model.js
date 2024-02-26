const connection = require('./connection');

const getAllFromDB = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM sales;',
  );
  return sales;
};

const findById = async (id) => {
  const [[sale]] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?;',
    [id],
  );
  return sale;
};

module.exports = {
  getAllFromDB,
  findById,
};