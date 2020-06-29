'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./routes/home')(app);
  require('./routes/user')(app);
};
