const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { productsServiceSuccessful, 
  allProductsFromDB,
  findByIdProductService,
  insertProductService,
  insertProductServiceRequired } = require('../mocks/products.mock'); 

const { expect } = chai;
chai.use(sinonChai);

describe('Testando o controller de products', function () {
  it('Testa se na rota GET /products todos os produtos são retornados', async function () {
    // triploA = 'Arrange, Act, Assert';
    // Arrange
    const req = {};

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(productsService, 'getAllProducts').resolves(productsServiceSuccessful);

    // Act

    await productsController.allProducts(req, res);
    
    // Assert

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsFromDB);
  });

  it('Testa se na rota GET /products/:id um produto é retornado', async function () {
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

    sinon.stub(productsService, 'getProductById').resolves(findByIdProductService);

    // Act

    await productsController.productById(req, res);
    
    // Assert

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsFromDB[0]);
  });

  it('Testa se na rota GET /products/:id quando um produto não é encontrado retorna um mensagem de erro', async function () {
    // triploA = 'Arrange, Act, Assert';
    // Arrange
    const req = {
      params: {
        id: 99999999,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(productsService, 'getProductById').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

    // Act

    await productsController.productById(req, res);
    
    // Assert

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Testa se na rota POST /products um produto é inserido', async function () {
    // triploA = 'Arrange, Act, Assert';
    // Arrange
    const req = {
      body: {
        name: 'Martelo de Thor',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(productsService, 'insertProduct').resolves(insertProductService);

    // Act

    await productsController.insert(req, res);
    
    // Assert

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 4, name: 'Martelo de Thor' });
  });

  it('Testa se na rota POST /products quando o nome produto não é passado retorna um mensagem de erro com status 400', async function () {
    // triploA = 'Arrange, Act, Assert';
    // Arrange
    const req = {
      body: {},
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(productsService, 'insertProduct').resolves(insertProductServiceRequired);

    // Act

    await productsController.insert(req, res);
    
    // Assert

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Testa se na rota DELETE /products/:id um produto é deletado', async function () {
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

    sinon.stub(productsService, 'deleteProduct').resolves({ status: 'NO_CONTENT' });

    // Act

    await productsController.deleteProduct(req, res);
    
    // Assert

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});