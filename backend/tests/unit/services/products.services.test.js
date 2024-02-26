const { expect } = require('chai');
const sinon = require('sinon');
// const connection = require('../../../src/models/connection');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { allProductsFromDB, notFoundProduct, insertProductServiceInvalid } = require('../mocks/products.mock');
const httpStatusName = require('../../../src/utils/httpStatusName');

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
    expect(response).to.be.deep.equal({ status: httpStatusName.SUCCESSFUL, data: allProductsFromDB });
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
    expect(response).to.be.deep.equal({ status: httpStatusName.SUCCESSFUL, data: allProductsFromDB[0] });
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
    expect(response).to.be.deep.equal({ status: httpStatusName.NOT_FOUND, data: notFoundProduct });
  });

  it('Testa se a service insere um produto corretamente', async function () {
    // triple A

    // Arrange

    const name = 'Martelo de Thor';
    sinon.stub(productsModel, 'insert').resolves({ insertId: 4 });

    // Act

    const response = await productsService.insertProduct(name);

    // Assert

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response).to.be.deep.equal({ status: httpStatusName.CREATED, data: { id: 4, name } });
  });

  it('Testa se a service retorna uma mensagem de erro quando o nome do produto é menor que 5 caracteres', async function () {
    // triple A

    // Arrange

    const name = 'Thor';
    const insert = sinon.spy(productsModel, 'insert');

    // Act

    const response = await productsService.insertProduct(name);

    // Assert

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response).to.be.deep.equal(insertProductServiceInvalid);
    expect(insert.notCalled).to.be.equal(true);
  });

  afterEach(function () {
    sinon.restore();
  });
});