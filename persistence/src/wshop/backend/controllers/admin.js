const adminServices = require('../services/admin');

exports.list = async function(req, res) {
  const products = await adminServices.getList();
  res.json({
    data: products,
    success: true,
  });
};

exports.add = async function(req, res) {
  const body = req.body;
  const result = await adminServices.add(req.user, body);
  res.json({
    data: result,
    success: true,
  });
};

exports.delete = async function(req, res) {
  const id = req.query.id;
  const result = await adminServices.delete({ id });
  res.json({
    data: result,
    success: !!result,
  });
};
