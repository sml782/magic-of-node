const sequelize = require('../db/index');
const Sequelize = sequelize.Sequelize;

module.exports = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  }
});
