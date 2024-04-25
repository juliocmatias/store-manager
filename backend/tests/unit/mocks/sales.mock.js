const products = require('./products.mock');

const dateMock = '2024-02-24T21:27:35.000Z';

const allSales = [
  {
    saleId: 1,
    sales: [
      {
        date: dateMock,
        productId: 1,
        productName: 'Martelo de Thor',
        quantity: 5,
      },
      {
        date: dateMock,
        productId: 2,
        productName: 'Traje de encolhimento',
        quantity: 10,
      },
    ],
  },
  {
    saleId: 2,
    sale: [
      {
        date: dateMock,
        productId: 3,
        productName: 'Escudo do CapitÃ£o AmÃ©rica',
        quantity: 15,
      },
    ],
  },
];

const saleFindIdIs1 = [{
  saleId: 1,
  sales: [
    {
      date: dateMock,
      productId: 1,
      productName: 'Martelo de Thor',
      quantity: 5,
    },
    {
      date: dateMock,
      productId: 2,
      productName: 'Traje de encolhimento',
      quantity: 10,
    },
  ],
}];

const notFound = {
  message: 'Sale not found',
};

const salesServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: allSales,
};

const findByIdSaleService = {
  status: 'SUCCESSFUL',
  data: saleFindIdIs1,
};

const saleNotFound = {
  status: 'NOT_FOUND',
  data: notFound,
};

const salesProducts = [
  {
    productId: 1,
    productName: products.allProductsFromDB.find((product) => product.id === 1).name,
    quantity: 5,
  },
  {
    productId: 2,
    productName: products.allProductsFromDB.find((product) => product.id === 2).name,
    quantity: 10,
  },
];

const salesSuccessModel = {
  id: 9999,
  itemsSold: salesProducts,
};

const salesSuccessService = {
  status: 'CREATED',
  data: salesSuccessModel,
};

const salesUnprocessableEntity = {
  status: 'UNPROCESSABLE_ENTITY',
  data: { message: '"quantity" must be greater than or equal to 1' },
};

const salesServiceProductNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = {
  allSales,
  notFound,
  salesServiceSuccessful,
  findByIdSaleService,
  saleFindIdIs1,
  saleNotFound,
  salesProducts,
  salesSuccessModel,
  salesSuccessService,
  salesUnprocessableEntity,
  salesServiceProductNotFound,
};

// [
//   {
//     saleId: 1,
//     sales: [
//       {
//         date: '2024-04-24T18:25:48.000Z',
//         productId: 1,
//         productName: 'Martelo de Thor',
//         quantity: 5,
//       },
//       {
//         date: '2024-04-24T18:25:48.000Z',
//         productId: 2,
//         productName: 'Traje de encolhimento',
//         quantity: 10,
//       },
//     ],
//   },
//   {
//     saleId: 2,
//     sale: [
//       {
//         date: '2024-04-24T18:25:48.000Z',
//         productId: 3,
//         productName: 'Escudo do CapitÃ£o AmÃ©rica',
//         quantity: 15,
//       },
//     ],
//   },
// ];

// SELECT
//     SP.sale_id AS saleId,
//     JSON_ARRAYAGG(
//         JSON_OBJECT(
//             'date', SA.date,
//             'productId', SP.product_id,
//             'productName', PR.name,
//             'quantity', SP.quantity
//         )
//     ) AS sales
// FROM
//     sales_products AS SP
// INNER JOIN
//     sales AS SA ON SP.sale_id = SA.id
// INNER JOIN
//     products AS PR ON SP.product_id = PR.id
// GROUP BY
//     SP.sale_id