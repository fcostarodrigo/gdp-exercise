class Checkout {

  /**
   * Shopping cart
   *
   * @param {rules[]} pricingRules 
   * @param {Customer} customer Customer to help calculate the total
   */
  constructor(pricingRules, customer) {
    this.pricingRules = pricingRules;
    this.customer = customer;
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  total() {

    for (const rule of this.pricingRules) {
      rule(this.customer, this.items);
    }

    return this.items.reduce((sum, item) => {

      if ('price' in item) {
        return sum + item.price;
      }

      // Fallback to product price if item does not have a special price
      return sum + item.product.price;
    }, 0);
  }
}

module.exports = Checkout;
