const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  id: String,
  name: String,
  price: Number,
  logo: Boolean,
  maxText: Number, // Max number of chars in an item text
  rank: Number, // Used to sort items
});

module.exports = mongoose.model('Product', Product);
