const KKB = require('./koa');
const Router = require('./router');
const app = new KKB();
const router = new Router();

const delay = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

router.get('/index', async ctx => {
  console.log('index,xx');
  ctx.body = 'index page';
});
router.get('/post', async ctx => {
  ctx.body = 'post page';
});
router.get('/list', async ctx => {
  ctx.body = 'list page';
});
router.post('/index', async ctx => {
  ctx.body = 'post page';
});

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
  await next();
});

app.use(router.routes());

app.listen(6001, () => {
  console.log('监听端⼝口6001');
});
