
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
export type Resolve<T> = (value?: T) => PromiseLike<T> | void;
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
export type FulfilledCB<T> = (value: T) => T | PromiseLike<T>;
/**
 * 成功回调表
 */
export type FulfilledCBs<T> = () => FulfilledCB<T> | PromiseLike<T> | unknown;

/**
 * 失败回调
 */
export type RejectedCB = (reason: any) => never | unknown;
/**
 * 失败回调表
 */
export type RejectedCBs = () => RejectedCB | unknown;

/**
 * 类 Promise
 *
 * @export
 * @interface PromiseLike
 * @template T
 */
export interface PromiseLike<T extends unknown> {
  then(onfulfilled?: FulfilledCB<T> | null, onrejected?: RejectedCB | null): PromiseLike<T>;
}
