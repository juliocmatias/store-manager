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

module.exports = {
  allProductsFromDB,
  notFoundProduct,
  productsServiceSuccessful,
  findByIdProductService,
};