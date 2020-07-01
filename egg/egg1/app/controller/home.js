'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // console.log(ctx.isAuthenticated(), ctx.session);
    if (!ctx.isAuthenticated()) {
      ctx.session.returnTo = ctx.path;
      ctx.body = '<button style="width:500px; height: 300px">登录</button>';
      return;
    }
    ctx.body = 'hi, egg';
  }

  async login() {
    const { ctx, service } = this;
    const payload = ctx.request.body;
    const token = await service.login.in(payload);
    ctx.success({ token }, '登录成功');
  }
}

module.exports = HomeController;
