import fs from 'fs';
import EventEmitter from 'events';

interface WSOptions {
  flags?: string;
  encoding?: string;
  fd?: number;
  mode?: number;
  autoClose?: boolean;
  start?: number;
  highWaterMark?: number;
}

interface CacheListItem {
  chunk: Buffer;
  encoding?: string;
  callback(error: Error | null | undefined): void;
}

type WriteCallback = (error: Error | null | undefined) => void;

type WriteFunc1 =
  ((chunk: any, cb?: WriteCallback) => boolean)
  |
  ((chunk: any, encoding?: string, cb?: WriteCallback) => boolean);

function writeFunc(chunk: any, cb?: WriteCallback): boolean;
function writeFunc(chunk: any, encoding?: string, cb?: WriteCallback): boolean;
function writeFunc(this: WriteStream) {
  const args = Array.from(arguments);
  let chunk = args[0];
  let encoding = this.encoding;
  let callback: WriteCallback;
  if (!Buffer.isBuffer(chunk)) {
    chunk = Buffer.from(chunk);
  }
  this.length += chunk.length;
  const result = this.length < this.highWaterMark;
  this.needDrain = !result;

  if (typeof args[1] === 'string') {
    encoding = args[1];
    callback = args[2];
  } else {
    callback = args[1];
  }

  const clearCacheList = () => {
    this._clearCacheList();
    callback(null);
  }

  const cacheListItem = {
    chunk,
    encoding,
    callback: clearCacheList,
  };

  if (this.writable) {
    this.cacheList.push(cacheListItem);
  } else {
    this.writable = true;
    this._write(cacheListItem);
  }

  return result;
}

class WriteStream extends EventEmitter {
  filePath = '';
  flags = 'w';
  encoding?: string;
  fd?: number;
  mode = 0o666;
  autoClose = true;
  start = 0;
  highWaterMark = 16 * 1024;
  offset: number;
  length: number;
  writable = false;
  cacheList: CacheListItem[] = [];
  needDrain = false;

  constructor(path: string, options?: string | WSOptions) {
    super();

    this.filePath = path;
    this.offset = 0;
    this.length = 0;

    if (!options) {
      return;
    }

    // 直接就是编码
    if (typeof options === 'string') {
      this.encoding = options;
      return;
    }

    this.flags = options.flags || 'r';
    this.encoding = options.encoding || undefined;
    this.fd = options.fd || undefined;
    this.mode = options.mode || 0o666;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.highWaterMark = options.highWaterMark || 16 * 1024;

    // 打开文件
    this.open();
  }

  destroy(error?: NodeJS.ErrnoException | null) {
    if (error) {
      this.emit('error', error);
    }
    if (typeof this.fd === 'number' && this.autoClose) {
      fs.close(this.fd, (err) => {
        if (err) {
          this.emit('error', err);
        }
        this.emit('close');
      });
    }
  }

  open() {
    fs.open(this.filePath, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.destroy(err);
        return;
      }
      this.fd = fd;
      this.emit('open', fd);
      this.emit('ready');
    });
  }

  _clearCacheList() {
    if (this.needDrain) {
      this.needDrain = false;
      this.emit('drain');
    }
    if (!this.cacheList.length) {
      this.emit('finish');
      this.destroy();
      return;
    }
    const wItem = this.cacheList.shift();
    if (!wItem) {
      this._clearCacheList();
      return;
    }
    this._write(wItem);
  }

  _write(wItem: CacheListItem) {
    if (typeof this.fd !== 'number') {
      this.once('open', () => this._write(wItem));
      return;
    }
    fs.write(this.fd, wItem.chunk, 0, wItem.chunk.length, this.offset, (err, written) => {
      this.offset += written;
      this.length -= written;
      wItem.callback(err);
    });
  }

  write = writeFunc.bind(this);
}

export default (path: string, options?: string | WSOptions) => {
  return new WriteStream(path, options);
};
