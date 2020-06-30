'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.resources('users', '/user', controller.user);
  // router.get('/user', controller.user.index);
  // router.put('/user', controller.user.create);
};
