const express = require('express');
const route = express.Router();
const Product = require('../models/product');

route.get('/products', function(req, res) {
  const products = await Product.findAll();
  res.json(products);
});

route.get('/users', function(req, res) {

  res.send('List of APIv1 users.');
});

module.exports = apiv1;
