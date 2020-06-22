const Product = require('../models/product');

class Admin {
  getList() {
    return Product.findAll();
  }

  add(db, params) {
    return db.createProduct(params);
  }

  delete(params) {
    return Product.destroy({ where: params })
  }
}

module.exports = new Admin();
