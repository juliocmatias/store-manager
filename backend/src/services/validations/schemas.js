const Joi = require('joi');

const nameProduct = Joi.string()
  .min(5).messages({
    'string.min': '"name" length must be at least 5 characters long',
  });

module.exports = {
  nameProduct,
};