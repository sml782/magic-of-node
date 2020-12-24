
const events = {};

const init = Symbol.for('[[EventEmitterInit]]');
const onceWrap = Symbol.for('[[EventEmitterOnceWrap]]');

interface Function {
  once?: boolean;
  realFn?: Function;
  (...args: any[]): void;
}

class EventEmitter {
  private _events: Record<string, Function[]> = {};

  private [init]() {
    if (!this._events) {
      this._events = {};
    }
  }

  private [onceWrap](eventName: string, callback: Function): Function {
    const onceFn = (...args: any[]) => {
      // @ts-ignore
      callback(args);
      this.off(eventName, onceFn);
    }
    onceFn.realFn = callback;
    onceFn.once = true;
    return onceFn;
  }

  on(eventName: string, callback: Function) {
    this[init]();

    if (!this._events[eventName]) {
      this._events[eventName] = [callback];
      return;
    }

    this._events[eventName].push(callback);
  }

  off(eventName: string, callback: Function) {
    this[init]();

    if (!this._events[eventName]) {
      return;
    }

    if (!callback) {
      this._events[eventName] = [];
      return;
    }

    this._events[eventName] = this._events[eventName].filter(fn => {
      return fn !== callback;
    });
  }

  emit(eventName: string, ...args: any[]) {
    this[init]();

    if (!this._events[eventName]) {
      return;
    }

    // @ts-ignore
    this._events[eventName].forEach(fn => fn(args));
  }

  once(eventName: string, callback: Function) {
    this[init]();

    this.on(eventName, this[onceWrap](eventName, callback))
  }
}

export default EventEmitter;
