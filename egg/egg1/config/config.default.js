/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1593251209683_9533';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  // security
  config.security = {
    csrf: {
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    },
  };

  // mongoose
  config.mongoose = {
    url: 'mongodb://127.0.0.1/example',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useMongoClient: true,
      // autoReconnect: true,
      // reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
    // mongoose global plugins, expected a function or an array of function and options
    // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
  };

  // validate
  config.validate = {
    // convert: false,
    // validateRoot: false,
  };

  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: /^\/user/, // optional
  };

  // error
  config.errorHandler = {
    match: '/',
  };
  // config.onerror = {
  //   all(err, ctx) {
  //     // 在此处定义针对所有响应类型的错误处理方法
  //     // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
  //     ctx.body = 'error';
  //     ctx.status = 500;
  //   },
  //   html(err, ctx) {
  //     // html hander
  //     ctx.body = '<h3>error</h3>';
  //     ctx.status = 500;
  //   },
  //   json(err, ctx) {
  //     // json hander
  //     ctx.body = { message: 'error' };
  //     ctx.status = 500;
  //   },
  //   jsonp(err, ctx) {
  //     // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
  //   },
  // };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
