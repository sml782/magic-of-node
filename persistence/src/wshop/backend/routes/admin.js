const express = require('express');
const route = express.Router();
const Product = require('../models/product');
const admin = require('../controllers/admin');

route.get('/products', admin.list);

route.put('/product', admin.add);

route.delete('/product', admin.delete);

module.exports = route;
