// promise 最重要的核心就是解决了 1. 异步并发问题 2.回调地狱问题 回调函数

/**
 * 发布订阅模式 把需要做的事情放到数组中，等事情发生依次执行
 * ! 重点在 发布 和 订阅
 * 发布和订阅之前没有任何关联
 */
interface Sub<T> {
  arr: T[];
  on(fn: T): void;
  emit(): void;
}
const subscrib: Sub<Function> = {
  arr: [],
  on(fn) {
    this.arr.push(fn);
  },
  emit() {
    this.arr.forEach(fn => fn());
  }
};

/**
 * 观察者模式 观察者和被观察者之间存在关联
 * ! 内部还是观察者模式
 */


