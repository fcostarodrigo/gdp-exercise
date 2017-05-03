/**
 * Allows extra information to be attached to a product before checking out
 */
class Item {
  constructor(product, logo, text) {

    this.product = product;

    if (logo && !this.product.logo) {
      throw new TypeError(`Can't add logo in ${product.id} items.`);
    }

    this.logo = logo;

    if (text && text.length > product.maxText) {
      throw new TypeError(`Text of ${product.id} items should have less than ${product.maxText} chars.`);
    }

    this.text = text;
  }
}

module.exports = Item;
