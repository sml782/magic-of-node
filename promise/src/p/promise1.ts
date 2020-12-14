import {
  state,
  result,
  fulfilledCBs,
  rejectedCBs,
  handleExecute,
} from './const';
import {
  STATE,
  Resolve,
  Reject,
  Executor,
  FulfilledCB,
  FulfilledCBs,
  RejectedCB,
  RejectedCBs,
} from './interface';

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
      this[state] = STATE.fulfilled;
      this[result] = reason;
      this[rejectedCBs].forEach(fn => fn());
    }
    executor(resolve, reject);
  }

  [handleExecute](resolve: Resolve<T>, reject: Reject, callback?: FulfilledCB<T> | RejectedCB | null) {
    try {
      const x = callback && callback(this[result]);
      resolve(x as T);
    } catch (err) {
      reject(err);
    }
  }

  then(onfulfilled?: FulfilledCB<T> | null, onrejected?: RejectedCB | null): SPromise<T> {
    // 默认给你添加一个成功回调
    onfulfilled = onfulfilled || ((val) => val);
    // 默认给你添加一个失败回调
    onrejected = onrejected || ((reason) => { throw reason });

    return new SPromise<T>((resolve, reject) => {
      switch (this[state]) {
        case STATE.fulfilled: {
          return this[handleExecute](resolve, reject, onfulfilled);
        }

        case STATE.rejected: {
          return this[handleExecute](resolve, reject, onrejected);
        }

        default:
        case STATE.pending: {
          this[fulfilledCBs].push(() => {
            return this[handleExecute](resolve, reject, onfulfilled);
          });
          this[rejectedCBs].push(() => {
            return this[handleExecute](resolve, reject, onrejected);
          });
        }
      }
    });
  }

  catch(onrejected?: RejectedCB): SPromise<T> {
    return this.then(null, onrejected);
  }
}

export default SPromise;
