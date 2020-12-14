import { PromiseLike } from './interface';

export const isPromise = <T>(promise: any): promise is PromiseLike<T> => {
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
