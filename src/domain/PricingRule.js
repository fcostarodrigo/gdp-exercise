const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PricingRule = new Schema({
  customerId: String,
  packSale: {
    productId: String,
    size: Number
  },
  reprice: {
    productId: String,
    price: Number
  },
  wholesale: {
    productId: String,
    threshold: Number,
    price: Number
  }
});

module.exports = mongoose.model('PricingRule', PricingRule);
