const Sequelize = require('sequelize');

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
    // timestamps: false,
    underscored: true,
  },
});
// console.log(sequelize);

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

// 定义模型
const Fruit = sequelize.define(
  'Fruit',
  {
    // id 默认加，但是值自增的, 需自定义为 UUID
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
      get() {
        const fname = this.getDataValue('name');
        const price = this.getDataValue('price');
        const stock = this.getDataValue('stock');
        return `${fname}(价格:¥${price} 库存:${stock}kg)`;
      }
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { msg: "价格字段请输⼊入数字" },
        min: { args: [0], msg: "价格字段必须⼤大于0" }
      }
    },
    stock: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: { msg: "库存字段请输⼊入数字" }
      }
    },
  },
  {
    // 避免⾃自动⽣生成时间戳字段
    // timestamps: false

    // 序列化字段名到数据库中, 驼峰转下划线
    // underscored: true,

    // 结果 通过实例触发
    getterMethods:{
      amount() {
        return this.getDataValue('stock') + 'kg';
      },
    },
    setterMethods:{
      amount(val) {
        const idx = val.indexOf('kg');
        const v = val.slice(0, idx);
        this.setDataValue('stock', v);
      },
    }
  }
);
// console.log(Fruit);

// 一次实例化所有模型
// sequelize.sync()

(async () => {
  // 同步数据库，force: true 则会删除已存在表
  const model = await Fruit.sync({ force: true });
  // console.log('sync', model);

  // const createRes = await Fruit.create({
  //   name: '⾹香蕉',
  //   price: 23
  // });
  // console.log('create', createRes);

  let all = await Fruit.findAll();
  // console.log('findAll', JSON.stringify(all, null, 4));
  const [aaa] = all;
  // 触发实例设置方法
  // aaa.amount = '220kg';
  // aaa.save();
  // console.log(aaa.toJSON())
  // console.log(aaa.get())

  // await Fruit.update(
  //   { price: 4 },
  //   { where: { name:'⾹香蕉'} }
  // );
  // console.log('findAll', JSON.stringify(ret));
  // const Op = Sequelize.Op;
  // all = await Fruit.findAll({
  // where: { price: { [Op.lt]:4 }, stock: { [Op.gte]: 100 } }
  //   where: { price: { [Op.lte]: 4, [Op.gt]: 2 } }
  // });
  // console.log('findAll', JSON.stringify(all, null, '\t'));

  //
})();
