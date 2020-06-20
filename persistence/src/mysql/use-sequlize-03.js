const Sequelize = require('sequelize');
(async () => {
  // 建⽴立连接
  const sequelize = new Sequelize('magic', 'root', '123456', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    timezone: '+08:00',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
      underscored: true,
    },
  });

  // 测试连接是否正常
  // 使用 `.authenticate()` 函数来测试连接是否正常
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  const Meat = sequelize.define('meat', { name: Sequelize.STRING });
  const Category = sequelize.define('category', { name: Sequelize.STRING });
  Meat.MeatCategory = Meat.belongsToMany(Category, {
    through: 'MeatCategory',
  });

  // 插入测试数据
  sequelize.sync().then(async () => {
    // await Meat.create(
    //   {
    //     name: '牛肉',
    //     categories: [{ id: 1, name: '牛' }, { id: 2, name: '猪' }]
    //   },
    //   {
    //     include: [Meat.MeatCategory]
    //   }
    // );
    // 多对多联合查询
    const meat = await Meat.findOne({
      where: { name: '牛肉' },
      // 通过through指定条件、字段等
      // include: [{ model: Category, through: { attributes: ['id', 'name'] } }]
      include: [Meat.MeatCategory],
    });
    console.log(meat.get({ plain: true }));
  })
})();
