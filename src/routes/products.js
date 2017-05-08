const express = require('express');
const router = express.Router();

const Product = require('../domain/Product');

/**
 * List all products.
 */
router.get('/', function (req, res, next) {
  Product.find().exec().then((products) => {
    res.json(products);
  }).catch(next);
});

module.exports = router;
