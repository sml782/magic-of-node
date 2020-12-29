import fs from 'fs';
import path from 'path';

const readFile = path.resolve(__dirname, './testfile/read.txt');
const writeFile = path.resolve(__dirname, './testfile/write.txt');

const rs = fs.createReadStream(readFile);
const ws = fs.createWriteStream(writeFile);

rs.pipe(ws);
