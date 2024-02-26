const allProductsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const notFoundProduct = {
  message: 'Product not found',
};

const productsServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: allProductsFromDB,
};

const findByIdProductService = {
  status: 'SUCCESSFUL',
  data: allProductsFromDB[0],
};

const insertProductServiceRequired = {
  status: 'BAD_REQUEST',
  data: { message: '"name" is required' },
};

const insertProductService = { status: 'CREATED', data: { id: 4, name: 'Martelo de Thor' } };

const insertProductServiceInvalid = {
  status: 'INVALID_VALUE',
  data: { message: '"name" length must be at least 5 characters long' },
};

module.exports = {
  allProductsFromDB,
  notFoundProduct,
  productsServiceSuccessful,
  findByIdProductService,
  insertProductService,
  insertProductServiceRequired,
  insertProductServiceInvalid,
};