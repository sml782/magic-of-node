import SPromise from './p/promise1';
// import { register } from 'ts-node';

// register()

// console.log(tsNode);
// const promise = new SPromise((resolve, reject) => {
//   // resolve(666);
//   // reject(123456);
//   setTimeout(() => {
//     resolve(666);
//   }, 1000);
// });
// promise
// .then(
//   (value) => {
//     // console.log(1111, value);
//     // // throw new Error('23133');
//     // return 1111;
//     return new SPromise((resolve => {
//       setTimeout(() => resolve(23456789), 1000);
//     }));
//   },
//   (reason) => {
//     console.log(2222, reason);
//     return 2222;
//   },
// )
// .then(
//   (value) => {
//     console.log(3333, value);
//   },
//   (reason) => {
//     console.log(4444, reason);
//   },
// );

SPromise.all([
  // SPromise.reject(new Error('111')),
  SPromise.resolve(1),
  Promise.resolve(3),
  2
]).then(v => {
  console.log(v);
  return v;
}).catch(v => console.log(v))

// new Promise()
new Promise<string>(() => {}).then();
Promise.all
// export default SPromise;

export {};
