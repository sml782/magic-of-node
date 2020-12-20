
/***** Buffer.prototype.concat *****/
Buffer.concat = function concat(list: ReadonlyArray<Buffer>, totalLength?: number): Buffer {
  let len: number = totalLength || 0;

  // 计算总长度
  if (typeof totalLength !== 'number') {
    list.forEach(bf => {
      len += bf.length;
    });
  }

  // 开辟空间
  const concatBuffer = Buffer.alloc(len);

  // 开始拼接
  let currentLen = 0;
  for (let i = 0; i < list.length; i++) {
    list[i].copy(concatBuffer, currentLen);
    currentLen += list[i].length;
  }

  return concatBuffer;
}


const buf1 = Buffer.from('调试');
const buf2 = Buffer.from('控制台');
const arrayBuffer = Buffer.concat([buf1, buf2], 6);
console.log(arrayBuffer);
console.log(arrayBuffer.length);
console.log(arrayBuffer.toString());

export {};
