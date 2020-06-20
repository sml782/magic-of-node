const sequelize = require('../util/database');
const Sequelize = sequelize.Sequelize;

module.exports = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});
