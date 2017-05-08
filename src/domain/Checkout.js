const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Store what rules were in place at the time of the checkout.
 */
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

/**
 * Product with extra information attached
 *
 * This allows the sales history to not be affected by changes in the product list.
 */
const Item = new Schema({
  product: {
    id: String,
    name: String,
    price: Number,
    logo: Boolean,
    maxText: Number,
    rank: Number,
  },
  logo: String,
  text: String
});

/**
 * Customer shopping cart
 */
const Checkout = new Schema({
  customerId: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  pricingRules: [PricingRule],
  items: [Item]
}, { toJSON: { virtuals: true } });

function packSale(prices, items, { productId, size }) {
  let counter = 0;

  items.forEach((item, i) => {
    if (item.product.id === productId) {
      counter += 1;
    }

    if (counter === size) {
      prices[i] = 0;
      counter = 0;
    }
  });
}

function reprice(prices, items, { productId, price }) {
  items.forEach((item, i) => {
    if (item.product.id === productId) {
      prices[i] = price;
    }
  });
}

function wholesale(prices, items, { productId, threshold, price }) {
  if (items.filter((item) => item.product.id === productId).length >= threshold) {
    reprice(prices, items, { productId, price });
  }
}

Checkout.virtual('sum').get(function () {
  return this.items.reduce((sum, item) => {
    return sum + item.product.price;
  }, 0);
});

Checkout.virtual('total').get(function () {
  const prices = this.items.map((item) => item.product.price);

  for (const rule of this.pricingRules) {
    packSale(prices, this.items, rule.packSale);
    reprice(prices, this.items, rule.reprice);
    wholesale(prices, this.items, rule.wholesale);
  }

  return prices.reduce((a, b) => a + b, 0);
});

Checkout.virtual('discount').get(function () {
  return this.total - this.sum;
});

module.exports = mongoose.model('Checkout', Checkout);
