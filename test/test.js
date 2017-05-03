const assert = require('assert');

const Checkout = require('../src/Checkout.js');
const Item = require('../src/Item.js');
const pricingRules = require('../src/pricingRules.js');

const customers = require('../data/customers.json');
const products = require('../data/products.json');

describe('checkout', function () {

  it('should pass scenario 1', function () {
    const checkout = new Checkout(pricingRules, customers['default']);
    checkout.add(new Item(products.classic));
    checkout.add(new Item(products.standout));
    checkout.add(new Item(products.premium));
    assert.equal(checkout.total(), 987.97);
  });

  it('should pass scenario 2', function () {
    const checkout = new Checkout(pricingRules, customers.UNILEVER);
    checkout.add(new Item(products.classic));
    checkout.add(new Item(products.classic));
    checkout.add(new Item(products.classic));
    checkout.add(new Item(products.premium));
    assert.equal(checkout.total(), 934.97);
  });

  it('should pass scenario 3', function () {
    const checkout = new Checkout(pricingRules, customers.APPLE);
    checkout.add(new Item(products.standout));
    checkout.add(new Item(products.standout));
    checkout.add(new Item(products.standout));
    checkout.add(new Item(products.premium));
    assert.equal(checkout.total(), 1294.96);
  });

  it('should pass scenario 4', function () {
    const checkout = new Checkout(pricingRules, customers.NIKE);
    checkout.add(new Item(products.premium));
    checkout.add(new Item(products.premium));
    checkout.add(new Item(products.premium));
    checkout.add(new Item(products.premium));
    assert.equal(checkout.total(), 1519.96);

  });

  it('should pass scenario 5', function () {
    const checkout = new Checkout(pricingRules, customers.FORD);
    checkout.add(new Item(products.premium));
    checkout.add(new Item(products.premium));
    checkout.add(new Item(products.premium));
    checkout.add(new Item(products.standout));
    checkout.add(new Item(products.standout));
    checkout.add(new Item(products.standout));
    checkout.add(new Item(products.classic));
    checkout.add(new Item(products.classic));
    checkout.add(new Item(products.classic));
    assert.equal(checkout.total(), 2909.91);
  });
});
