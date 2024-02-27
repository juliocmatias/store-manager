const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { allSales, 
  saleFindIdIs1, 
  salesServiceSuccessful, 
  findByIdSaleService, 
  saleNotFound,
  salesProducts,
  salesSuccessService } = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testando o controller de sales', function () {
  it('Testa se na rota GET /sales todas as vendas são retornadas', async function () {
    // triploA = 'Arrange, Act, Assert';
    // Arrange
    const req = {};

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(salesService, 'getAllSales').resolves(salesServiceSuccessful);

    // Act

    await salesController.allSales(req, res);
    
    // Assert

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales);
  });

  it('Testa se na rota GET /sales/:id a venda é retornada pelo id', async function () {
    // triploA = 'Arrange, Act, Assert';
    // Arrange
    const req = {
      params: {
        id: 1,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(salesService, 'getSaleById').resolves(findByIdSaleService);

    // Act

    await salesController.saleById(req, res);
    
    // Assert

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFindIdIs1);
  });

  it('Testa se na rota GET /sales/:id ao id inválido a venda não é encontrada', async function () {
    // triploA = 'Arrange, Act, Assert';
    // Arrange
    const req = {
      params: {
        id: 999999,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(salesService, 'getSaleById').resolves(saleNotFound);

    // Act

    await salesController.saleById(req, res);

    // Assert

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Testa se na rota POST /sales é possível inserir uma nova venda', async function () {
    // triploA = 'Arrange, Act, Assert';
    // Arrange
    const req = {
      body: {
        sales: salesProducts,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(salesService, 'insertSale').resolves(salesSuccessService);

    // Act

    await salesController.insertSaleProducts(req, res);

    // Assert

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(salesSuccessService.data);
  });

  afterEach(function () {
    sinon.restore();
  });
});