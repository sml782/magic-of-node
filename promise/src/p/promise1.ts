import {
  state,
  result,
  fulfilledCBs,
  rejectedCBs,
  handleExecute,
} from './const';
import { isPromise } from './utils';
import {
  STATE,
  Resolve,
  Reject,
  Executor,
  FulfilledCB,
  FulfilledCBs,
  RejectedCB,
  RejectedCBs,
  PromiseLike,
} from './interface';

/**
 * 整理调用 promise 版本的结果
 *
 * @template T
 * @param {PromiseLike<unknown>} promise2 下一个promise
 * @param {unknown} x 上次调用结果
 * @param {Resolve<T>} resolve 成功回调
 * @param {Reject} reject 失败回调
 * @returns
 */
function resolvePromise<T>(promise2: PromiseLike,  x: unknown, resolve: Resolve<T>, reject: Reject): any {
  if (x === promise2) {
    return reject(new TypeError('我死循环了啊'));
  }
  if (isPromise(x)) {
    let called = false;
    try {
      const then = x.then;
      return then.call(
        x,
        y => {
          if (called) return;
          called = true;
          // 结果有可能还是 Promise, 走递归
          return resolvePromise(promise2, y, resolve, reject);
        },
        r => {
          if (called) return;
          called = true;
          return reject(r);
        }
      );
    } catch (err) {
      return reject(err);
    }
  }
  resolve(x as T);
};

/**
 * 模拟版 Promise
 *
 * @class SPromise
 * @template T
 */
class SPromise<T> {
  [state]: STATE = STATE.pending;
  [result]: T;
  [fulfilledCBs]: FulfilledCBs<T>[] = [];
  [rejectedCBs]: RejectedCBs[] = [];

  static resolve = (value?: unknown) => {
    return new SPromise((resolve) => resolve(value));
  }

  static reject = (reason?: any) => {
    return new SPromise((resolve, reject) => reject(reason));
  }

  static all = <T>(values: Iterable<T | PromiseLike<T>>): SPromise<T[]> => {
    return new SPromise<T[]>((resolve, reject) => {
      const result: T[] = [];
      const vs = Array.from(values);
      let resNum = 0;
      const addResult = (val: T, i: number) => {
        result[i] = val;
        if (++resNum === vs.length) {
          return resolve(result);
        }
      };
      for (let idx in vs) {
        const promise = vs[idx];
        if (!isPromise<T>(promise)) {
          return addResult(promise, Number(idx));
        }
        promise.then(
          y => {
            addResult(y, Number(idx));
            console.log(result)
            return y;
          },
          r => {
            reject(r);
          }
        );
      }
    });
  }

  constructor(executor: Executor<T>) {
    const resolve = (value?: T) => {
      if (this[state] !== STATE.pending) {
        return;
      }
      this[state] = STATE.fulfilled;
      this[result] = value as T;
      this[fulfilledCBs].forEach(fn => fn());
    }
    const reject = (reason?: any) => {
      if (this[state] !== STATE.pending) {
        return;
      }
      this[state] = STATE.rejected;
      this[result] = reason;
      this[rejectedCBs].forEach(fn => fn());
    }
    try {
      executor(resolve, reject);
    } catch(err) {
      reject(err);
    }
  }

  [handleExecute]<TResult>(resolve: Resolve<TResult>, reject: Reject, promise2: PromiseLike<T>, callback?: FulfilledCB | RejectedCB) {
    try {
      if (!callback) {
        return resolve();
      }
      const x = callback(this[result]);
      return resolvePromise<TResult>(promise2, x, resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then<TResult1 = T, TResult2 = never>(onfulfilled?: FulfilledCB<TResult1>, onrejected?: RejectedCB<TResult2>): SPromise<TResult1 | TResult2> {
    // 默认给你添加一个成功回调
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : ((val) => val);
    // 默认给你添加一个失败回调
    onrejected = typeof onfulfilled === 'function' ? onrejected : ((reason) => { throw reason });

    const promise2 = new SPromise<TResult1 | TResult1>((resolve, reject) => {
      setTimeout(() => {
        switch (this[state]) {
          case STATE.fulfilled: {
            return this[handleExecute]<TResult1 | TResult1>(resolve, reject, promise2, onfulfilled);
          }

          case STATE.rejected: {
            return this[handleExecute]<TResult1 | TResult1>(resolve, reject, promise2, onrejected);
          }

          default:
          case STATE.pending: {
            this[fulfilledCBs].push(() => {
              return this[handleExecute]<TResult1 | TResult1>(resolve, reject, promise2, onfulfilled);
            });
            this[rejectedCBs].push(() => {
              return this[handleExecute]<TResult1 | TResult1>(resolve, reject, promise2, onrejected);
            });
          }
        }
      }, 0);
    });
    return promise2;
  }

  catch<TResult = never>(onrejected?: RejectedCB<TResult>): SPromise<T | TResult> {
    return this.then(null, onrejected);
  }
}

export default SPromise;
