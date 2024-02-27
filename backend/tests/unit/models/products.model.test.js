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

    const products = await productsModel.getAllFromDB();

    // Assert
    expect(products).to.be.an('array');
    expect(products[0]).to.be.an('object');
    expect(products).to.be.deep.equal(allProductsFromDB);
  });

  it('Testa se faz a busca de um produto pelo id corretamente', async function () {
    // triploA - Arrange, Act, Assert
    // Arrange
    const id = 1;
    sinon.stub(connection, 'execute').resolves([[allProductsFromDB[0]]]);

    // Act
    const product = await productsModel.findById(id);

    // Assert
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(allProductsFromDB[0]);
  });

  it('Testa se insere um produto corretamente', async function () {
    // triploA - Arrange, Act, Assert
    // Arrange
    const name = 'Martelo de Thor';
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    // Act
    const result = await productsModel.insert(name);

    // Assert
    expect(result).to.be.an('object');
    expect(result.insertId).to.be.deep.equal(4);
  });

  it('Testa se a model atualiza um produto corretamente', async function () {
    // triploA - Arrange, Act, Assert
    // Arrange
    const id = 1;
    const name = 'Martelo de Thorto';
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    // Act
    const [result] = await productsModel.update(id, name);

    // Assert
    expect(result).to.be.an('object');
    expect(result.affectedRows).to.be.deep.equal(1);
  });

  it('Testa se a model deleteById deleta um produto corretamente', async function () {
    // triploA - Arrange, Act, Assert
    // Arrange
    const id = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    // Act
    const [result] = await productsModel.deleteById(id);

    // Assert
    expect(result).to.be.an('object');
    expect(result.affectedRows).to.be.deep.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});