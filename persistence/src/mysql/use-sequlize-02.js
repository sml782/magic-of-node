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

  const Player = sequelize.define('player', { name: Sequelize.STRING });
  const Team = sequelize.define('team', { name: Sequelize.STRING });
  // Player:Team = 1:N
  // Player.belongsTo(Team);
  Player.belongsTo(Team, {
    as: 'Current',
    foreignKey: 'teamId',
    // 约束, 防止循环引用
    constraints: true,
    onDelete: 'CASCADE'
  }); // 1端建立关系
  Team.hasMany(Player); // N端建立关系

  // 同步数据库，force: true 则会删除已存在表
  sequelize.sync().then(async () => {
    await Team.create({ name: '火箭' });
    // // 批量创建
    await Player.bulkCreate([{ name: '哈登', teamId: 1 }, { name: '保罗', teamId: 1 }]);

    // 1端关联查询
    // const players = await Player.findAll({ include: [Team] });
    const players = await Player.findAll({ include: [{ model: Team, as: 'Current' }] });
    console.log(JSON.stringify(players, null, 2));

    // N端关联查询
    const team = await Team.findOne({ where: { name: '火箭' }, include: [Player] });
    console.log(JSON.stringify(team, null, 2));
  });
})();
