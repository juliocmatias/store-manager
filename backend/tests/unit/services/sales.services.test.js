const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { allSales, 
  saleFindIdIs1, 
  salesServiceSuccessful, 
  findByIdSaleService, 
  saleNotFound,
  salesProducts,
  salesSuccessModel,
  salesSuccessService,
  salesUnprocessableEntity } = require('../mocks/sales.mock');

describe('Testa salesService', function () {
  it('Testa se a service retorna todos as vendas com sucesso', async function () {
    // TripleAAA
    // Arrange
    sinon.stub(salesModel, 'getAllFromDB').resolves(allSales);

    // Act

    const response = await salesService.getAllSales();

    // Assert

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response).to.be.deep.equal(salesServiceSuccessful);
  });

  it('Testa se a service retorna uma venda com sucesso', async function () {
    // TripleAAA
    // Arrange
    const id = 1;
    sinon.stub(salesModel, 'findById').resolves(saleFindIdIs1);

    // Act

    const response = await salesService.getSaleById(id);

    // Assert

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response).to.be.deep.equal(findByIdSaleService);
  });

  it('Testa se a service retorna um erro quando passado um id invalido', async function () {
    // TripleAAA
    // Arrange
    const id = 999999;
    sinon.stub(salesModel, 'findById').resolves([]);

    // Act

    const response = await salesService.getSaleById(id);

    // Assert

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response).to.be.deep.equal(saleNotFound);
  });

  it('Testa se a service insere uma nova venda com sucesso', async function () {
    // TripleAAA
    // Arrange
    const executeStub = sinon.stub(salesModel, 'insert');

    executeStub.resolves(salesSuccessModel);

    // Act

    const response = await salesService.insertSale(salesProducts);

    // Assert

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response).to.be.deep.equal(salesSuccessService);
  });

  it('Testa se a service retorna um erro ao tentar inserir uma venda com quantidade invalida', async function () {
    // TripleAAA
    // Arrange
    const sales = [
      { productId: 1, quantity: 0 },
    ];
    const executeStub = sinon.stub(salesModel, 'insert');

    executeStub.resolves({});

    // Act

    const response = await salesService.insertSale(sales);

    // Assert

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response).to.be.deep.equal(salesUnprocessableEntity);
  });

  afterEach(function () {
    sinon.restore();
  });
});