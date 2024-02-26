const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSales, saleFindIdIs1 } = require('../mocks/sales.mock');

describe('Testa salesModel', function () {
  it('Testa se a model retorna do DB todas as vendas', async function () {
    // triploA - Arrange, Act, Assert
    // Arrange
    sinon.stub(connection, 'execute').resolves([allSales]);

    // Act
    const sales = await salesModel.getAllFromDB();

    // Assert
    expect(sales).to.be.an('array');
    expect(sales[0]).to.be.an('object');
    expect(sales).to.be.deep.equal(allSales);
  });

  it('Testa se a model retorna do DB todas as vendas encontrada por id', async function () {
    // triploA - Arrange, Act, Assert
    // Arrange
    const id = 1;
    sinon.stub(connection, 'execute').resolves([saleFindIdIs1]);

    // Act
    const sale = await salesModel.findById(id);

    // Assert
    expect(sale[0]).to.be.an('object');
    expect(sale).to.be.deep.equal([
      {
        date: '2024-02-24T21:27:35.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        date: '2024-02-24T21:27:35.000Z',
        productId: 2,
        quantity: 10,
      },
    ]);
  });

  afterEach(function () {
    sinon.restore();
  });
});