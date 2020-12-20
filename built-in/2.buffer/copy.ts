
/***** Buffer.prototype.copy *****/
Buffer.prototype.copy = function (targetBuffer, targetStart = 0, sourceStart = 0, sourceEnd) {
  if (typeof sourceEnd !== 'number') {
    sourceEnd = this.length;
  }

  // 检查参数范围
  const checkRangeParam = (num?: number) => {
    if (typeof num === 'number') {
      if (num < 0) {
        throw new RangeError('Index out of range');
      }
    }
  }

  checkRangeParam(targetStart);
  checkRangeParam(sourceStart);
  checkRangeParam(sourceEnd);

  // 确定目标可插入范围
  let lastInsertLen = targetBuffer.length - targetStart;

  // 开始插入
  let insertLen = 0;
  for (let i = sourceStart; i < sourceEnd && i <= lastInsertLen; i++) {
    insertLen++;
    targetBuffer[targetStart + i] = this[i];
  }
  return insertLen;
}

const buf1 = Buffer.from('调试');
const buf2 = Buffer.from('控制台');

const copyBuffer = Buffer.alloc(15);
buf1.copy(copyBuffer, 0, 3, -1);
buf2.copy(copyBuffer, 6, 0, 9);
console.log(copyBuffer);
console.log(copyBuffer.length);
console.log(copyBuffer.toString());

export {};
