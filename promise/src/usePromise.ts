import SPromise from './p/promise1';

const promise = new SPromise((resolve, reject) => {
  // resolve(666);
  // reject(123456);
  setTimeout(() => {
    resolve(666);
  }, 1000);
});
promise
.then(
  (value) => {
    // console.log(1111, value);
    // // throw new Error('23133');
    // return 1111;
    return new SPromise((resolve => {
      setTimeout(() => resolve(23456789), 1000);
    }));
  },
  (reason) => {
    console.log(2222, reason);
    return 2222;
  },
)
.then(
  (value) => {
    console.log(3333, value);
  },
  (reason) => {
    console.log(4444, reason);
  },
)

// new Promise()
// new Promise<string>(() => {}).then();

// export default SPromise;

export {};
