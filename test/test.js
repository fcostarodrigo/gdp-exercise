const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiSubset = require('chai-subset');

const app = require('../src/index');

const products = require('../data/products.json');
const customers = require('../data/customers.json');

chai.should();
chai.use(chaiHttp);
chai.use(chaiSubset);

function productKey2item(productId) {
  return {
    product: products.find((product) => product.id === productId),
    logo: '',
    text: ''
  };
}

function runScenario(customer, productIds, total, done) {
  const checkoutPath = `/customers/${customer}/checkouts/active`;
  const itemPath = `/customers/${customer}/checkouts/active/items`;
  const items = productIds.map(productKey2item);
  for (const item of items) {
    chai.request(app).post(itemPath).send(item).end((err, res) => {
      res.should.have.status(200);
      items.pop();
      if (items.length === 0) {
        chai.request(app).get(checkoutPath).end((err, res) => {
          res.body.should.have.property('total').eql(total);
          done();
        });
      }
    });
  }
}

describe('Drop', () => {
  it('should drop the database', function (done) {
    chai.request(app).get('/drop').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});

describe('Make', () => {
  it('should populate the database', function (done) {
    chai.request(app).get('/make').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});

describe('Products', () => {
  it('should return the data in the json', function (done) {
    chai.request(app).get('/products').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.containSubset(products);
      done();
    });
  });
});

describe('Customers', () => {
  it('should return the data in the json', function (done) {
    chai.request(app).get('/customers').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.containSubset(customers);
      done();
    });
  });

  it('should pass scenario 1', function (done) {
    runScenario('default', ['classic', 'standout', 'premium'], 987.97, done);
  });

  it('should pass scenario 2', function (done) {
    runScenario('UNILEVER', ['classic', 'classic', 'classic', 'premium'], 934.97, done);
  });

  it('should pass scenario 3', function (done) {
    runScenario('APPLE', ['standout', 'standout', 'standout', 'premium'], 1294.96, done);
  });

  it('should pass scenario 4', function (done) {
    runScenario('NIKE', ['premium', 'premium', 'premium', 'premium'], 1519.96, done);
  });

  it('should pass scenario 5', function (done) {
    runScenario('FORD', [
      'premium', 'premium', 'premium',
      'standout', 'standout', 'standout',
      'classic', 'classic', 'classic'
    ], 2909.91, done);
  });
});
