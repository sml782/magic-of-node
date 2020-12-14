/**
 * 不可访问状态唯一标识值
 */
export const state = Symbol.for('[[PromiseState]]');

/**
 * 不可访问结果唯一标识值
 */
export const result = Symbol.for('[[PromiseResult]]');

/**
 * 不可访问成功回调队列
 */
export const fulfilledCBs = Symbol.for('[[PromiseOnFulfilledCallbacks]]');

/**
 * 不可访问失败回调队列
 */
export const rejectedCBs = Symbol.for('[[PromiseOnRejectedCallbacks]]');

/**
 * 不可访问统一执行回调
 */
export const handleExecute = Symbol.for('[[handleExecute]]');
