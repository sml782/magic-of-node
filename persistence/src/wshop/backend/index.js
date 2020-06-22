const path = require('path');
const Express = require('express');
// const cors = require('cors');
const app = Express();
const db = require('./db/index');
const User = require('./models/user');
const adminRoute = require('./routes/admin');

// app.use(cors());
app.use('/static', Express.static(path.join(__dirname, 'public')));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// 加载用户 - 代替鉴权
app.use(async (req, res, next) => {
  const user = await User.findByPk(1);
  req.user = user;
  await next();
});

app.use('/admin', adminRoute);

db.sync().then(async (result) => {
  let user = await User.findByPk(1);
  if (!user) {
    user = await User.create({
      name: 'Sourav',
      email: 'sourav.dey9@gmail.com'
    })
    await user.createCart();
  }
  app.listen(6001, () => console.log('Listening to port 6001'));
});
