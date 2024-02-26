const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateRegisterProduct = require('../../../src/middlewares/validateRegisterProduct');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa middlewares de products', function () {
  it('Testa se o middleware validateRegisterProduct retorna um erro quando não é passado o campo name', function () {
    const req = { body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateRegisterProduct(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Testa se o middleware validateRegisterProduct chama o next quando é passado o campo name', function () {
    const req = { body: { name: 'Martelo de Thor' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validateRegisterProduct(req, res, next);

    expect(next.calledOnce).to.equal(true);
  });
});