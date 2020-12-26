
/**
 * 状态值列表
 */
export const enum STATE {
  pending = 'PENDING',
  fulfilled = 'FULFILLED',
  rejected = 'REJECTED',
}

/**
 * 成功调用
 */
export type Resolve<T = unknown> = (value?: T) => PromiseLike<T> | void;
/**
 * 失败调用
 */
export type Reject = (reason?: any) =>  void;
/**
 * Promise 执行器
 */
export type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void;

/**
 * 成功回调
 */
export type FulfilledCB<T = any> = ((value: T) => T | PromiseLike<T>) | null;
/**
 * 成功回调表
 */
export type FulfilledCBs<T> = () => FulfilledCB<T> | PromiseLike<T> | unknown;

/**
 * 失败回调
 */
export type RejectedCB<T = never> = ((reason: any) => T | PromiseLike<T>) | null;
/**
 * 失败回调表
 */
export type RejectedCBs<T = never> = () => RejectedCB<T> | unknown;

/**
 * 类 Promise
 *
 * @export
 * @interface PromiseLike
 * @template T
 */
export interface PromiseLike<T = unknown> {
  then<TResult1 = T, TResult2 = never>(onfulfilled?: FulfilledCB<TResult1> | null, onrejected?: RejectedCB<TResult2> | null): PromiseLike<T>;
}
