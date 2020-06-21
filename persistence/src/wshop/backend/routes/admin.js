const express = require('express');
const route = express.Router();
const Product = require('../models/product');

route.get('/products', async (req, res) => {
  const products = await Product.findAll();
  res.json({
    data: products,
    success: true,
  });
});

route.post('/product', async (req, res) => {
  const body = req.body;
  const result = await req.user.createProduct(body);
  res.json({
    data: result,
    success: true,
  });
});

route.delete('/product/:id', async (req, res) => {
  const id = req.params.id;
  const result = await Product.destroy({ where: { id } });
  res.json({
    data: result,
    success: true,
  });
});
console.log(route);
module.exports = route;
