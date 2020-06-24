const express = require('express');
const router = express.Router();
const api = require('../controllers/api');

router.route('/cart')
  .get(api.cartList)
  .put(api.addCart)
  .delete(api.deleteCart);

router.route('/order')
  .get(api.orderList)
  .put(api.addOrder)
  .delete(api.deleteOrder);

module.exports = router;
