const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { allProductsFromDB } = require('../mocks/products.mock'); 

describe('Testa productsModel', function () {
  it('Testa se faz a busca de todos os produtos corretamente', async function () {
    // triploA - Arrange, Act, Assert
    // Arrange
    sinon.stub(connection, 'execute').resolves([allProductsFromDB]);

    // Act
    const products = await productsModel.getAllProductsFromDB();
    // Assert
    expect(products).to.be.an('array');
    expect(products[0]).to.be.an('object');
    expect(products).to.be.deep.equal(allProductsFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});