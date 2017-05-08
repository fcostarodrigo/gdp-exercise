const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
  id: String,
});

module.exports = mongoose.model('Customer', Customer);
