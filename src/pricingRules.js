/**
 * n for m type of discount where m is n - 1
 *
 * @param {Item[]} items
 * @param {string} productId
 * @param {number} n Number of items in a pack
 */
function packSale(items, productId, n) {
  let counter = 0;
  for (const item of items) {
    if (item.product.id === productId) {
      counter += 1;
    }

    if (counter === n) {
      item.price = 0;
      counter = 0;
    }
  }
}

/**
 * Reprice a product
 *
 * @param {Item[]} items 
 * @param {string} productId 
 * @param {number} price 
 */
function reprice(items, productId, price) {
  for (const item of items) {
    if (item.product.id === productId) {
      item.price = price;
    }
  }
}

/**
 * Discount after buying n products
 *
 * @param {Item[]} items
 * @param {string} productId
 * @param {number} n Number of items needed to apply the discount
 * @param {number} price
 */
function wholesale(items, productId, n, price) {
  if (items.filter((item) => item.product.id === productId).length >= n) {
    reprice(items, productId, price);
  }
}

function unilever(customer, items = []) {
  if (customer.id === 'UNILEVER') {
    packSale(items, 'classic', 3);
  }
}

function apple(customer, items = []) {
  if (customer.id === 'APPLE') {
    reprice(items, 'standout', 299.99);
  }
}

function nike(customer, items = []) {
  if (customer.id === 'NIKE') {
    wholesale(items, 'premium', 4, 379.99);
  }
}

function ford(customer, items = []) {
  if (customer.id === 'FORD') {
    packSale(items, 'classic', 5);
    reprice(items, 'standout', 309.99);
    wholesale(items, 'premium', 3, 389.99);
  }
}

module.exports = [
  unilever,
  apple,
  nike,
  ford
];