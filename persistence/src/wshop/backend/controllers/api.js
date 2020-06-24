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
  const result = await commonServices.de({ id });
  res.json({
    data: result,
    success: !!result,
  });
};

exports.orderList = async function(req, res) {
  const result = await commonServices.getOrders(req.user);
  res.json({
    data: result,
    success: !!result,
  });
};

exports.addOrder = async function(req, res) {
  const id = req.query.id;
  const result = await commonServices.delete({ id });
  res.json({
    data: result,
    success: !!result,
  });
};

exports.deleteOrder = async function(req, res) {
  const id = req.query.id;
  const result = await commonServices.delete({ id });
  res.json({
    data: result,
    success: !!result,
  });
};