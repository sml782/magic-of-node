const Product = require('../models/product');

class Admin {
  async getCarts(db, params) {
    const cart = await db.getCart();
    return await cart.getProducts({
      attributes: { exclude: ['user_id', 'userId'] },
    });
  }

  async addCart(db, params) {
    const id = params.id;
    let newQuantity = params.quantity || 1;
    const cart = await db.getCart();
    const products = await cart.getProducts({
      where: { id },
    });
    let product = products[0];
    if (product) {
      const quantity = product.cartItem.quantity;
      newQuantity += quantity;
    } else {
      product = await Product.findByPk(id);
    }
    await cart.addProduct(product, {
      through: {
        quantity: newQuantity,
      }
    });
    return 1;
  }

  async deleteCart(db, params) {
    const cart = await db.getCart();
    const products = await cart.getProducts({
      where: params,
    });
    if (!products.length) {
      return null;
    }
    return await products[0].cartItem.destroy();
  }

  async getOrders(db) {
    return await db.getOrders({
      includes: [Product],
      order: [['createdAt', 'DESC']],
    });
  }

  async addOrder(db) {
    const cart = await db.getCart();
    const products = await cart.getProducts();
    const order = await db.createOrder();
    const productList = products.map(p => {
      p.orderItem = {
        quantity: p.cartItem.quantity,
      }
      return p;
    });
    return await order.addProducts(productList);
  }

  async deleteOrder(db, params) {
    const [order] = await db.getOrders({
      where: params
    });
    if (!order) {
      return true;
    }
    await order.destroy();
    return true;
  }
}

module.exports = new Admin();
