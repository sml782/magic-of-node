const sequelize = require('../util/database');
const Sequelize = sequelize.Sequelize;

module.exports = sequelize.define('user', {
  id : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});
