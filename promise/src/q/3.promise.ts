
/**
 * promise
 * 1. 异步并发问题
 * 2. 回调地狱问题 回调函数
 */

/**
 * Promise 状态列表
 */
const enum STATUS {
  pending = 'PENDING',
  fulfilled = 'FULFILLED',
  rejected = 'REJECTED',
};

/* 成功回调 */
type FulfilledCallback = (value: unknown) => unknown;

/* 失败回调 */
type RejectedCallback = (reason: any) => any;

// 暂存不可访问属性
const state = Symbol.for('[[PromiseState]]');
const result = Symbol.for('[[PromiseResult]]');
const onFulfilledCallbacks = Symbol.for('[[PromiseOnFulfilledCallbacks]]');
const onRejectedCallbacks = Symbol.for('[[PromiseOnRejectedCallbacks]]');
const handleExecute = Symbol.for('[[PromiseHandleExecute]]');

/**
 * 自定义 Promise
 *
 * @class SPromise
 * @template T
 */
class SPromise<T> {
  [state]: STATUS = STATUS.pending;
  [result]: unknown;
  [onFulfilledCallbacks]: FulfilledCallback[] = [];
  [onRejectedCallbacks]: RejectedCallback[] = [];

  constructor(executor: (resolve: (value?: T | unknown) => void, reject: (reason?: any) => void) => void) {
    const resolve = (value?: T | unknown) => {
      if (this[state] !== STATUS.pending) {
        return;
      }
      this[state] = STATUS.fulfilled;
      this[result] = value;
      this[onFulfilledCallbacks].forEach(cb => cb(this[result]));
    };
    const reject = (reason?: any) => {
      if (this[state] !== STATUS.pending) {
        return;
      }
      this[state] = STATUS.rejected;
      this[result] = reason;
      this[onRejectedCallbacks].forEach(cb => cb(this[result]));
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  [handleExecute](resolve: Function, reject: Function, callback?: Function) {
    try {
      const x = callback && callback(this[result]);
      resolve(x);
    } catch (err) {
      reject(err);
    }
  }

  then(onfulfilled?: FulfilledCallback, onrejected?: RejectedCallback): SPromise<unknown> {
    return new SPromise((resolve: any, reject: any) => {
      switch (this[state]) {
        case STATUS.fulfilled:
          return this[handleExecute](resolve, reject, onfulfilled);
        case STATUS.rejected:
          return this[handleExecute](resolve, reject, onrejected);
        case STATUS.pending:
        default:
          this[onFulfilledCallbacks].push(() => {
            this[handleExecute](resolve, reject, onfulfilled);
          });
          this[onRejectedCallbacks].push(() => {
            this[handleExecute](resolve, reject, onrejected);
          });
          return;
      }
    });
  }
}

const promise = new SPromise((resolve: any, reject: any) => {
  // resolve(666);
  // reject(123456);
  setTimeout(() => {
    resolve(666);
  }, 1000);
});
promise
.then(
  (value: any) => {
    console.log(1111, value);
    throw new Error('23133');
    return 1111;
  },
  (reason: any) => {
    console.log(2222, reason);
    return 2222;
  },
)
.then(
  (value: any) => {
    console.log(3333, value);
  },
  (reason: any) => {
    console.log(4444, reason);
  },
)

// new Promise()
// new Promise(() => {}).then();

export default SPromise;
