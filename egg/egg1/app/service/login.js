'use strict';

const Service = require('egg').Service;

class Login extends Service {

  // 单数据
  async in(payload) {
    const { ctx, service } = this;
    const user = await ctx.model.User.findOne(payload);
    if (!user) {
      return ctx.throw(403, '登录失败');
    }
    return await service.actionToken.apply(user._id);
  }

}

module.exports = Login;
