const express = require('express');
const router = express.Router();

const Product = require('../domain/Product');
const Customer = require('../domain/Customer');
const PricingRule = require('../domain/PricingRule');
const Checkout = require('../domain/Checkout');

const products = require('../../data/products.json');
const customers = require('../../data/customers.json');
const pricingRules = require('../../data/pricingRules.json');

router.get('/', function (req, res, next) {

  function deepCopy(value) {
    return JSON.parse(JSON.stringify(value));
  }

  Promise.all([
    Product.collection.insertMany(deepCopy(products)),
    Customer.collection.insertMany(deepCopy(customers)),
    PricingRule.collection.insertMany(deepCopy(pricingRules))
  ]).then(() => {

    // Create a new checkout with the rules of each customer
    return Promise.all(customers.map((customer) => {
      return PricingRule.find({ customerId: customer.id }).then((pricingRules) => {
        const checkout = new Checkout();
        checkout.customerId = customer.id;
        checkout.pricingRules = pricingRules;
        return checkout.save();
      });
    })).then(() => res.send('Database populated'));
  }).catch(next);
});

module.exports = router;
