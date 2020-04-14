#!/usr/bin/env node

const programer = require('commander');
const v = require('../package.json').version;

// 配置版本
programer.version(v);

programer
  .command('init <name>')
  .description('初始化')
  .action(name => console.log(name));

programer
  .option('-s, --smlile', '给我笑😁😁😁😁😁')
  .action(() => console.log('😁😁😁😁😁'));


// 解析进程参数
programer.parse(process.argv);
