const Product = require('../models/product');

class Admin {
  getList() {
    const pp =  Product.build({ title: '123', price: 213 });
    console.log(pp)
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
