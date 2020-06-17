const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Koa {
  constructor() {
    this.middlewares = [];
  }

  use(callback) {
    this.middlewares.push(callback);
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res);
      const fn = this.compose();
      await fn(ctx);
      res.end(ctx.body);
    });
    server.listen(...args);
  }

  // 构建上下⽂文, 把res和req都挂载到ctx之上，并且在ctx.req和ctx.request.req同时保存
  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  compose() {
    const middlewares = this.middlewares;
    return function (ctx) {
      function dispatch(index) {
        const fn = middlewares[index];
        if (!fn) {
          return Promise.resolve();
        }
        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(index + 1);
          })
        )
      }
      return dispatch(0);
    };
  }
}

module.exports = Koa;
