const http = require('http');

class Koa {
  use(callback) {

  }

  listen(...args) {
    const server = http.createServer((req, res) => {
      this.callback(req, res);
    });
    server.listen(...args);
  }
}

module.exports = Koa;
