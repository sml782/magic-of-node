import { PromiseLike } from './interface';

export const isPromise = (promise: any): promise is PromiseLike<unknown> => {
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
