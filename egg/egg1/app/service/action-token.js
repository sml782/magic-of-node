'use strict';

const Service = require('egg').Service;

class ActionToken extends Service {
  async apply(id) {
    const { app } = this;
    return app.jwt.sign({
      data: {
        _id: id,
      },
      exp: Math.floor(Date.now() / 1000 + (60 * 60 * 7)),
    }, app.config.jwt.secret);
  }
}

module.exports = ActionToken;
