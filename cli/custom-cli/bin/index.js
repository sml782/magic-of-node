#!/usr/bin/env node

const { promisify } = require('util');
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { spawn } = require('child_process');
const figlet = promisify(require('figlet'));
const _ = require('lodash')
const v = require('../package.json').version;
const clone = require('../lib/download').clone;

// 配置版本
program.version(v);

// 初始化项目
program
  .command('init <name>')
  .description('初始化项目')
  .action(async name => {
    console.log(`🌈初始化 ${chalk.green(name)} 成功`);
    const text = await figlet('INIT OK');
    console.log(chalk.cyan(text));

    // github:ant-design/ant-design-pro

    const promps = [{
      type: 'input',
      name: 'repourl',
      message: '请输入模板git地址',
      validate: function (input){
        if(!input) {
          return 'repourl不能为空';
        }
        return true;
      }
    }];

    const answers = await inquirer.prompt(promps);

    console.log(chalk.grey(`🚀创建 ${name}`));

    await clone(name, answers.repourl);

    console.log(`🌈初始化 ${chalk.green(name)} 成功`);

    console.log(chalk.grey('安装依赖'));

    const ls = spawn('npm', ['install'], { cwd: `./${name}` }, );
    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
      console.log(`子进程退出，退出码 ${code}`);

      console.log(chalk.green('👌安装依赖完成'));
    });
  });

// 模块
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
    const promps = [];

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
