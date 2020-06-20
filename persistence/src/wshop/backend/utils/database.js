const Sequelize = require('sequelize');
const config = require('../config/config.local');

module.exports = new Sequelize(
  conf.database,
  conf.username,
  conf.password,
  {
    dialect: 'mysql',
    host: conf.host,
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
