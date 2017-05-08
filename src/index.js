const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const products = require('./routes/products');
const customers = require('./routes/customers');
const make = require('./routes/make');
const drop = require('./routes/drop');

const port = process.env.PORT || process.argv[3] || 8888;
const password = process.env.PASSWORD || process.argv[2];

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://fcostarodrigo:${password}@ds133261.mlab.com:33261/fcostarodrigo`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/products', products);
app.use('/customers', customers);
app.use('/make', make);
app.use('/drop', drop);
app.use(function (err, req, res, next) {
  if (next) {
    res.status(500);
    res.send(err);
    console.error(err);
  }
});

app.listen(port, function () {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
