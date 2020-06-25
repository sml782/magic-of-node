const commonServices = require('../services/common');

exports.cartList = async function(req, res) {
  const products = await commonServices.getCarts(req.user);
  res.json({
    data: products,
    success: true,
  });
};

exports.addCart = async function(req, res) {
  const body = req.body;
  const result = await commonServices.addCart(req.user, body);
  res.json({
    data: result,
    success: true,
  });
};

exports.deleteCart = async function(req, res) {
  const id = req.query.id;
  const result = await commonServices.deleteCart(req.user, { id });
  res.json({
    data: result,
    success: true,
  });
};

exports.orderList = async function(req, res) {
  const result = await commonServices.getOrders(req.user);
  res.json({
    data: result,
    success: true,
  });
};

exports.addOrder = async function(req, res) {
  const result = await commonServices.addOrder(req.user);
  res.json({
    data: result,
    success: true,
  });
};

exports.deleteOrder = async function(req, res) {
  const id = req.query.id;
  const result = await commonServices.deleteOrder(req.user, { id });
  res.json({
    data: result,
    success: true,
  });
};
