const express = require('express');
const router = express.Router();

const Customer = require('../domain/Customer');
const PricingRule = require('../domain/PricingRule');
const Checkout = require('../domain/Checkout');

/**
 * Get the active checkout of a customer.
 */
router.get('/:customerId/checkouts/active', function (req, res, next) {
  Checkout.findOne({ customerId: req.params.customerId }).sort('-createdAt').exec().then((checkout) => {
    res.json(checkout);
  }).catch(next);
});

/**
 * Add an item to a customer's checkout.
 */
router.post('/:customerId/checkouts/active/items', function (req, res, next) {
  Checkout.findOne({ customerId: req.params.customerId }).sort('-createdAt').exec().then((checkout) => {
    checkout.items.push(req.body);
    return checkout.save().then(() => res.json(req.body));
  }).catch(next);
});

/**
 * Simulates a sell
 *
 * Create a new empty checkout for the customer.
 * The new checkout, being more recent, is going to be used in future calls.
 */
router.post('/:customerId/checkouts', function (req, res, next) {
  PricingRule.find({ customerId: req.params.customerId }).then((pricingRules) => {
    const checkout = new Checkout();
    checkout.customerId = req.params.customerId;
    checkout.pricingRules = pricingRules;
    checkout.save().then((checkout) => res.json(checkout));
  }).catch(next);
});

/**
 * List all customers
 */
router.get('/', function (req, res, next) {
  Customer.find().exec().then((customers) => {
    res.json(customers);
  }).catch(next);
});

module.exports = router;
