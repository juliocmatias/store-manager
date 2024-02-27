const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateRegisterSales = require('../../../src/middlewares/validateRegisterSales');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa middlewares de sales', function () {
  it('Testa se o middleware validateRegisterSales retorna um erro quando não é passado o campo productId', function () {
    const req = { body: [{ quantity: 1 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateRegisterSales(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('Testa se o middleware validateRegisterSales retorna um erro quando não é passado o campo quantity', function () {
    const req = { body: [{ productId: 1 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateRegisterSales(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Testa se o middleware validateRegisterSales chama o next quando é passado os campos productId e quantity', function () {
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateRegisterSales(req, res, next);

    expect(next.calledOnce).to.equal(true);
  });
});