'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.success(null, '这里是user');
  }
}

module.exports = UserController;
