const allSales = [
  {
    saleId: 1,
    date: '2024-02-24T21:27:35.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2024-02-24T21:27:35.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2024-02-24T21:27:35.000Z',
    productId: 3,
    quantity: 15,
  },
];

const notFound = {
  message: 'Sale not found',
};

const salesServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: allSales,
};

const findByIdSaleService = {
  status: 'SUCCESSFUL',
  data: allSales[0],
};

module.exports = {
  allSales,
  notFound,
  salesServiceSuccessful,
  findByIdSaleService,
};