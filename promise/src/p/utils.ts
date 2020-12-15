import { PromiseLike } from './interface';

/**
 * 是否是 Promise
 *
 * @description 依据 promise A+ 规范，是对象或者函数，且有 `then` 方法，他就是 Promise
 * @export isPromise
 * @template T
 * @param {*} promise
 * @returns {promise is PromiseLike<T>}
 */
export function isPromise<T = unknown>(promise: any): promise is PromiseLike<T> {
  if (
    typeof promise === 'function'
    ||
    (typeof promise === 'object' && promise !== null)
  ) {
    if (promise.then) {
      return true;
    }
  }
  return false;
};
