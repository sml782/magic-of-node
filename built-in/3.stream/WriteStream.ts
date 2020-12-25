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

type WriteFunc =
  ((chunk: any, cb?: WriteCallback) => boolean)
  |
  ((chunk: any, encoding?: string, cb?: WriteCallback) => boolean);

class WriteStream extends EventEmitter {
  filePath = '';
  flags = 'w';
  encoding?: string;
  fd?: number;
  mode = 0o666;
  autoClose = true;
  start = 0;
  highWaterMark = 64 * 1024;
  offset: number;
  writable = false;
  cacheList: CacheListItem[] = [];

  constructor(path: string, options?: string | WSOptions) {
    super();

    this.filePath = path;
    this.offset = 0;

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
    this.highWaterMark = options.highWaterMark || 64 * 1024;

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

  _write() {

  }

  write: WriteFunc = (...args) => {
    let chunk = args[0];
    let encoding = this.encoding;
    let callback: WriteCallback;
    if (!Buffer.isBuffer(chunk)) {
      chunk = Buffer.from(chunk);
    }

    if (typeof args[1] === 'string') {
      encoding = args[1];
      callback = args[2];
    } else {
      callback = args[1];
    }

    return false;
  }
}

export default (path: string, options?: string | WSOptions) => {
  return new WriteStream(path, options);
};
