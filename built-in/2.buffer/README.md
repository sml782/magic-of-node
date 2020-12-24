# Buffer

## Buffer 二进制对象

前期默认没有h5的时候 浏览没有读写操作的 浏览器也有二进制对象 Blob File
js运行在node环境下 对文件做处理 前端传递的文件都是二进制对象

## 转化

Buffer => 二进制 和 字符串可以方便的转化
存储二进制  进制转化 2进制 10进制 16进制 （内存）

### 转化规则 ， |  &

单位 1个字节都是由8个位组成的 (存放的都是0,1)

// 编码规范 127个 ASCII

字母和字符 都是由一个字节组成
- GB2312 => GBK => gb18030 加了一些少数民族的字体  gbk的汉字 都是一个汉字两个字节
unicode 编码
- utf8 1-4个 可变的字节长度 （对于汉字而言 他的转化是由3个字节组件）
- node中他不支持gbk编码 只支持utf8 (字母字符，汉字而言就是一个汉字三个字节)

1个字节最大是255（十进制） （2进制就是1111111）  （8进制是多少？）
二进制以0b开头  255 -》 多少个16  255 里面由多少个8  商几余几
十六进制是0x开头 0xff
8进制以0开头 377


想把任意进制转化程10进制 parseInt

```js
console.log(parseInt('11111111',2));
```

把任意进制转化成任意进制

```js
console.log((0x16).toString(2)); // 10110
```

|  &  <<  针对的是二进制 
<< 位移表示平方

```js
console.log(1 << 3); // 00000100
```

110  |  010  =》 110

```js
console.log(0b100 | 0b010,0b110)
console.log(0b100 & 0b010);
```

## base64编码 （没有加密功能）

把一个汉字变成base64编码 一个汉字由个字节3组成 24个位 
表示把一个汉字转化成2进制 （表现形式是16进制）  base64转化后的结果会比以前大1/3 
不是所有图片都能转化成base64

```js
console.log(Buffer.from('珠'));// e7 8f a0
console.log((0xe7).toString(2))
console.log((0x8f).toString(2))
console.log((0xa0).toString(2))

// 11100111 10001111 10100000  3 * 8  = 4 * 6
// 00111001 00111000 00111110 00100000  最多是63

console.log(parseInt(0b00111001));
console.log(parseInt(0b00111000));
console.log(parseInt(0b00111110));
console.log(parseInt(0b00100000));

// 57 56 62 32
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
str += str.toLowerCase();
str += '0123456789+/'; // 64

console.log(str[57] + str[56] + str[62] + str[32]); // 54+g
```

base64 可以放在任何替代的url路径上 图片 背景图 链接


Buffer 代表的是node中的二进制 （表现给我们的是16进制） 内存
大小不能随便更改
