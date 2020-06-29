'use strict';

module.exports = {
  // 处理成功响应
  success(res = null, msg = '处理成功') {
    this.status = 200;
    this.body = {
      success: true,
      data: res,
      msg,
    };
  },

  // 处理失败响应
  error(res = null, msg = '处理失败') {
    this.status = 200;
    this.body = {
      success: false,
      data: res,
      msg,
    };
  },
};
