
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

const state = Symbol.for('[[PromiseState]]');
const result = Symbol.for('[[PromiseResult]]');
const onResolveCallbacks = Symbol.for('[[PromiseOnResolveCallbacks]]');
const onRejectCallbacks = Symbol.for('[[PromiseOnRejectCallbacks]]');
const handleExecute = Symbol.for('[[PromiseHandleExecute]]');

class SPromise {
  [state]: STATUS = STATUS.pending;
  [result]: any;
  [onResolveCallbacks]: Function[] = [];
  [onRejectCallbacks]: Function[] = [];
  constructor(executor: Function) {
    const resolve = (value: any) => {
      if (this[state] !== STATUS.pending) {
        return;
      }
      this[state] = STATUS.fulfilled;
      this[result] = value;
      this[onResolveCallbacks].forEach(cb => cb());
    };
    const reject = (reason: any) => {
      if (this[state] !== STATUS.pending) {
        return;
      }
      this[state] = STATUS.rejected;
      this[result] = reason;
      this[onRejectCallbacks].forEach(cb => cb());
    };
    executor(resolve, reject);
  }

  [handleExecute](resolve: Function, reject: Function, callback?: Function, ) {
    try {
      const res: any = callback && callback(this[result]);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  }

  then(onResolved?: Function, onRejected?: Function): SPromise {
    return new SPromise((resolve: any, reject: any) => {
      switch (this[state]) {
        case STATUS.fulfilled:
          return this[handleExecute](resolve, reject, onResolved);
        case STATUS.rejected:
          return this[handleExecute](resolve, reject, onRejected);
        case STATUS.pending:
        default:
          this[onResolveCallbacks].push(() => {
            this[handleExecute](resolve, reject, onResolved);
          });
          this[onRejectCallbacks].push(() => {
            this[handleExecute](resolve, reject, onRejected);
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

// export default SPromise;
