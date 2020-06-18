class Router {
  constructor() {
    this.stack = [];
  }

  register(path, method, middleware) {
    const index = this.stack.findIndex(item => item.path === path && item.method === method);
    let route = this.stack[index] || { path, method, middlewares: [middleware] };
    if (index === -1) {
      return this.stack.push(route);
    }
    route.middlewares.push(middleware);
    this.stack[index] = route;
  }

  get(path, middleware) {
    this.register(path, 'get', middleware);
  }

  post(path, middleware) {
    this.register(path, 'post', middleware);
  }

  compose(middlewares = []) {
    const stack = this.stack;
    return function(ctx) {
      function dispatch(index) {
        const mid = middlewares[index];
        if (!mid) {
          return Promise.resolve();
        }
        return Promise.resolve(mid(ctx, function next() {
          return dispatch(index + 1);
        }));
      }
      return dispatch(0);
    }
  }

  routes() {
    const stack = this.stack;
    async function exec (ctx, next) {
      const { url, method } = ctx;
      const { middlewares = [] } = stack.find(item => item.path === url && item.method === method) || {};
      const mid = this.compose(middlewares);
      await mid(ctx);
      await next();
    }
    return exec.bind(this);
  }
}

module.exports = Router;
