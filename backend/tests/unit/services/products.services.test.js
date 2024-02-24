const { expect } = require('chai');
const sinon = require('sinon');
// const connection = require('../../../src/models/connection');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { allProductsFromDB, notFoundProduct } = require('../mocks/products.mock');
const httpName = require('../../../src/utils/httpName');

describe('Testa a productsService', function () {
  it('Testa se a service o retorno de todos os produtos', async function () {
    // triple A

    // Arrange

    sinon.stub(productsModel, 'getAllFromDB').resolves(allProductsFromDB);

    // Act
    
    const response = await productsService.getAllProducts();

    // Assert

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response).to.be.deep.equal({ status: httpName.SUCCESSFUL, data: allProductsFromDB });
  });

  it('Testa se a service o retorno de um produto quando passado um id valido', async function () {
    // triple A

    // Arrange

    const id = 1;
    sinon.stub(productsModel, 'findById').resolves(allProductsFromDB[0]);

    // Act

    const response = await productsService.getProductById(id);

    // Assert

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response).to.be.deep.equal({ status: httpName.SUCCESSFUL, data: allProductsFromDB[0] });
  });

  it(('Testa se a service retorna um erro quando passado um id invalido'), async function () {
    // triple A

    // Arrange

    const id = 10;
    sinon.stub(productsModel, 'findById').resolves(null);

    // Act

    const response = await productsService.getProductById(id);

    // Assert

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response).to.be.deep.equal({ status: httpName.NOT_FOUND, data: notFoundProduct });
  });

  afterEach(function () {
    sinon.restore();
  });
});