const checkRequiredFields = require('../utils/checkRequiredFields');

const validateRegisterSales = (req, res, next) => {
  const sales = req.body;

  const requiredFields = ['productId', 'quantity'];

  for (let i = 0; i < sales.length; i += 1) {
    const currentSale = sales[i];
    const error = checkRequiredFields(currentSale, requiredFields);
    if (error) {
      return res.status(400).json({ message: error });
    }
  }

  next();
};

module.exports = validateRegisterSales;