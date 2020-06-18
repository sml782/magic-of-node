const Koa = require('koa');
const static = require('koa-static');
const router = require('./router');
const ipstable = require('./ipstable');
const app = new Koa();

app.use(ipstable);

app.use(async (ctx,next) => {
  const start = new Date().getTime();
  console.log(`start: ${ctx.url}`);
  await next();
  const end = new Date().getTime();
  console.log(`请求${ctx.url}, 耗时${parseInt(end-start)}ms`);
})

app.use(static(__dirname + '/static'))

app.use(router.routes());

app.use((ctx, next) => {
  ctx.body = [{ name: 'tom' }];
  next();
})

app.use((ctx, next) => {
  console.log(ctx.url);
  if (ctx.url === '/html') {
    ctx.type = 'text/html; charset=utf-8';
    ctx.body = `<b>我的名字是:${ctx.body[0].name}</b>`;
  }
});

app.listen(6001, () => {
  console.log('start at 6001');
});
