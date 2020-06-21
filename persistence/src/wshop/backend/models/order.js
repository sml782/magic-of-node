const sequelize = require('../db/index');
const Sequelize = sequelize.Sequelize;

module.exports = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});
