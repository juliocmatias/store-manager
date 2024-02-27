const Joi = require('joi');

const nameProduct = Joi.string()
  .min(5).messages({
    'string.min': '"name" length must be at least 5 characters long',
  });

const quantityProduct = Joi.number()
  .integer()
  .min(1).messages({
    'number.min': '"quantity" must be larger than or equal to 1',
    'number.integer': '"quantity" must be an integer',
  });

module.exports = {
  nameProduct,
  quantityProduct,
};