// EXTRA

/***** Buffer.prototype.split *****/
// @ts-ignore
Buffer.prototype.split = function (separator?: string | number | Buffer): Buffer[] {
  if (!Buffer.isBuffer(separator)) {
    if (!separator) {
      separator = Buffer.from('');
    } else if (typeof separator === 'number') {
      separator = Buffer.from(String(separator));
    } else {
      separator = Buffer.from(separator);
    }
  }

  let offset = 0;
  let current = 0;
  const sptorLength = separator.length;
  const resultBufList: Buffer[] = [];
  while ((current = this.indexOf(separator, offset)) !== -1) {
    const fragment = this.slice(offset, current);
    resultBufList.push(fragment);
    offset = current + sptorLength;
  }
  resultBufList.push(this.slice(offset));
  return resultBufList;
}

const buf = Buffer.from('我爱调试控制爱台');
console.log(buf.indexOf('', 2));
// @ts-ignore
console.log(buf.split('爱'));

export {};
