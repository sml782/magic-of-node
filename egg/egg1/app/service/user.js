'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 列表
  async list() {
    const { ctx } = this;
    return await ctx.model.User.find({}).exec();
  }

  // 单数据
  async show(id) {
    const { ctx } = this;
    return await ctx.model.User.findById(id);
  }

  // 创建用户
  async create(payload) {
    const { ctx } = this;
    return await ctx.model.User.create(payload);
  }

  // 更新用户
  async update(id, payload) {
    const { ctx } = this;
    const user = await ctx.model.User.findById(id);
    if (!user) {
      return ctx.throw(404, 'user not found');
    }
    return await user.updateOne(payload);
  }

  async destroy(id) {
    const { ctx } = this;
    return await ctx.model.User.deleteOne({ _id: id });
  }
}

module.exports = UserService;
