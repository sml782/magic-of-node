const KKB = require('./koa');
const app = new KKB();

const delay = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

// app.use((ctx) => {
//   console.log(ctx)
//   ctx.body = 'hi koa';
//   // res.writeHead(200);
// });

app.use(async (ctx, next) => { ctx.body = "1";
  await next();
  ctx.body += "5";
});

app.use(async (ctx, next) => {
  ctx.body += "2";
  await delay();
  await next();
  ctx.body += "4";
});

app.use(async (ctx, next) => {
  ctx.body += "3";
});

app.listen(6001, () => {
  console.log('监听端⼝口6001');
});
