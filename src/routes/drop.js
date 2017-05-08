const express = require('express');
const router = express.Router();

const Product = require('../domain/Product');
const Customer = require('../domain/Customer');
const PricingRule = require('../domain/PricingRule');
const Checkout = require('../domain/Checkout');

router.get('/', function (req, res, next) {

  Promise.all([
    Product.remove(),
    Customer.remove(),
    PricingRule.remove(),
    Checkout.remove()
  ]).then(() => res.send('Database dropped')).catch(next);

});

module.exports = router;
