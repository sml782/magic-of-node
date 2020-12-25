import fs from 'fs';
import path from 'path';
import { register } from 'ts-node';
import createReadStream from './ReadStream';

register();

const readFile = path.resolve(__dirname, './testfile/read.txt');

const rs = createReadStream(readFile, {
// const rs = fs.createReadStream(readFile, {
  flags: 'r',
  encoding: undefined,
  autoClose: true,
  start: 0,
  end: 9,
  highWaterMark: 3,
  // 8禁止权限位 r(4) w(2) x(1)
  mode: 0o666, // 权限  // d (rwx) (r-x) (r-x)  4 2 1 chmod -R 777
});

const dataBuf: Buffer[] = [];

rs.on('open', (fd) => {
  console.log('[open]', fd);
});

rs.on('ready', () => {
  console.log('[ready]');
});

rs.on('error', (error) => {
  console.log('[error]', error);
});

rs.on('data', (buf: Buffer) => {
  console.log('[data]', buf, buf.toString());
  dataBuf.push(buf);
  rs.pause();
  setTimeout(() => {
    rs.resume();
  }, 1000);
});

rs.on('end', () => {
  console.log(Buffer.concat(dataBuf).toString());
});

rs.on('close', () => {
  console.log('close');
});
