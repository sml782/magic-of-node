'use strict';
const Controller = require('egg').Controller;
const { createUserRequest } = require('../contract/user');

class UserController extends Controller {
  // 列表
  async index() {
    const { ctx, service } = this;
    const data = await service.user.list();
    ctx.success(data, '获取列表成功');
  }

  // 单数据
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const data = await service.user.show(id);
    ctx.success(data, '获取详情成功');
  }

  // 创建用户
  async create() {
    const { ctx, service } = this;
    ctx.validate(createUserRequest);
    const payload = ctx.request.body;
    const data = await service.user.create(payload);
    ctx.success(data, '创建用户成功');
  }

  // 更新用户
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body;
    await service.user.update(id, payload);
    ctx.success({ id }, '更新用户成功');
  }

  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.destroy(id);
    ctx.success(null, '删除用户成功');
  }
}

module.exports = UserController;
