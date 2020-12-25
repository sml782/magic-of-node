import fs from 'fs';
import path from 'path';

const readFile = path.resolve(__dirname, './read.txt');
const writeFile = path.resolve(__dirname, './write.txt');

const rs = fs.createReadStream(readFile, {
  flags: 'r',
  encoding: 'utf8',
  mode: 0o666,
  autoClose: true,
  start: 0,
  end: 9,
  highWaterMark: 3,
});


const ws = fs.createWriteStream(writeFile);
