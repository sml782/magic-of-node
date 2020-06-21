const Sequelize = require('sequelize');
const config = require('../config/config.local');

process.nextTick(() => {
  // 初始化数据库
  const Product = require('../models/product');
  const User = require('../models/user');
  const Cart = require('../models/cart');
  const CartItem = require('../models/cart-item');
  const Order = require('../models/order');
  const OrderItem = require('../models/order-item');

  Product.belongsTo(User, {
    foreignKey: 'user_id',
    sourceKey: 'id',
    constraints: true,
    onDelete: 'CASCADE',
  });
  User.hasMany(Product);
  User.hasOne(Cart);
  Cart.belongsTo(User);
  Cart.belongsToMany(Product, {
    through: CartItem
  });
  Product.belongsToMany(Cart, {
    through: CartItem
  });
  Order.belongsTo(User, {
    foreignKey: 'user_id',
    sourceKey: 'id',
    constraints: true,
    onDelete: 'CASCADE',
  });
  User.hasMany(Order);
  Order.belongsToMany(Product, {
    through: OrderItem
  });
  Product.belongsToMany(Order, {
    through: OrderItem
  });

});

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: 'mysql',
    host: config.host,
    timezone: '+08:00',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    define: {
      underscored: true,
    },
  }
);

module.exports = sequelize;
