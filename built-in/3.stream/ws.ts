import fs from 'fs';
import path from 'path';

const writeFile = path.resolve(__dirname, './write.txt');

const ws = fs.createWriteStream(writeFile, {
  flags: 'w',
  encoding: undefined,
  autoClose: true,
  start: 0,
  highWaterMark: 3,
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

flag = ws.write('o', (err) => {
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
