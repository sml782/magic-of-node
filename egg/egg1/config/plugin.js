'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // },

  security: {
    // xframe: {
    //   enable: false,
    // },

    // csrf: {
    //   ignore: ctx => {
    //     console.log(123456, ctx.ip);
    //     if (ctx.ip === '::1') {
    //       return true;
    //     }
    //     return false;
    //   },
    // },
  },

  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },

  passport: {
    enable: true,
    package: 'egg-passport',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};
