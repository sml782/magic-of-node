// import { EventEmitter } from 'events';
import EventEmitter from './events';

const ee = new EventEmitter();

ee.on('aa', () => {
  console.log(1);
});

ee.on('aa', () => {
  console.log(2);
});

ee.once('aa', () => {
  console.log(3);
})

ee.emit('aa');
ee.emit('aa');
