// 可写流也是基于fs模块的 但是内部是 继承自stream流中writable接口
// 同步写入，会批量写入，第一次调用fs.write, 后面的操作都放到了内存中
// 读和写的搭配流程 先读取=》调用write方法写入，如果放下超过预期，暂停读取 =》 等待写入完毕后=》触发drain事件=》在恢复读取，周而复始。 实现边读边写的功能

import fs from 'fs';
import path from 'path';
import { register } from 'ts-node';
import createWriteStream from './WriteStream';

register();

const writeFile = path.resolve(__dirname, './testfile/write.txt');

const ws = createWriteStream(writeFile, {
// const ws = fs.createWriteStream(writeFile, {
  flags: 'w',
  encoding: undefined,
  autoClose: true,
  start: 0,
  highWaterMark: 1,
  mode: 0o666,
});

ws.on('open', (fd) => {
  console.log('[open]', fd);
});

ws.on('ready', () => {
  console.log('[ready]');
});

ws.on('error', (error) => {
  console.log('[error]', error);
});

// 当写入的个数达到或者超过预期后被消费掉后，会触发 `drain` 事件
ws.on('drain', () => {
  console.log('[drain]');
});

ws.on('finish', () => {
  console.log('[finish]');
});

ws.on('close', () => {
  console.log('close');
});

let flag = ws.write('ok', 'utf8', (err) => {
  if (err) {
    console.log('[error]', err.message);
  }
  console.log(1);
});
console.log(flag);

flag = ws.write('o', (err) => {
  if (err) {
    console.log('[error]', err.message);
  }
  console.log(2);
});
console.log(flag);

flag = ws.write('ok', (err) => {
  if (err) {
    console.log('[error]', err.message);
  }
  console.log(3);
});
console.log(flag);

flag = ws.write('o', (err) => {
  if (err) {
    console.log('[error]', err.message);
  }
  console.log(4);
});
console.log(flag);
