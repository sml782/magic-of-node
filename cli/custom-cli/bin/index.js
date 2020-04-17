#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const _ = require('lodash')
const v = require('../package.json').version;

// 配置版本
program.version(v);

program
  .command('init <name>')
  .alias('in')
  .description('初始化项目')
  .action(name => console.log(`初始化 ${name} 成功`));

program
  .command('module')
  .alias('m')
  .description('创建新的模块')
  .option('--name [moduleName]')
  .option('--sass', '启用sass')
  .option('--less', '启用less')
  .action(option => {
    const config = _.assign({
      moduleName: null,
      description: '',
      sass: false,
      less: false
    }, option);
    var promps = []

    if(config.moduleName !== 'string') {
      promps.push({
        type: 'input',
        name: 'moduleName',
        message: '请输入模块名称',
        validate: function (input){
          if(!input) {
            return '不能为空';
          }
          return true;
        }
      })
    }

    if(config.description !== 'string') {
      promps.push({
        type: 'input',
        name: 'moduleDescription',
        message: '请输入模块描述'
      })
    }

    if(config.sass === false && config.less === false) {
      promps.push({
        type: 'list',
        name: 'cssPretreatment',
        message: '想用什么css预处理器呢',
        choices: [
          {
            name: 'Sass/Compass',
            value: 'sass'
          },
          {
            name: 'Less',
            value: 'less'
          }
        ]
      })
    }

    inquirer.prompt(promps).then(function (answers) {
      console.log(answers);
    })
  })
  .on('--help', function() {
    console.log('Examples:');
    console.log('');
    console.log('$ app module moduleName');
    console.log('$ app m moduleName');
  });


// 解析进程参数
program.parse(process.argv);
