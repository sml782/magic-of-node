import fs from 'fs';
import EventEmitter from 'events';

interface RSOptions {
  flags?: string;
  encoding?: string;
  fd?: number;
  mode?: number;
  autoClose?: boolean;
  start?: number;
  end?: number;
  highWaterMark?: number;
}

class ReadStream extends EventEmitter {
  filePath = '';
  flags = 'r';
  encoding?: string;
  fd?: number;
  mode = 0o666;
  autoClose = true;
  start = 0;
  end?: number;
  highWaterMark = 64 * 1024;
  offset: number;
  isPaused = false;

  constructor(path: string, options?: string | RSOptions) {
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
    this.end = options.end || undefined;
    this.highWaterMark = options.highWaterMark || 64 * 1024;

    // 打开文件
    this.open();

    // 当绑定的事件不是 `newListener` 会触发回调方法
    this.on('newListener', (type) => {
      if (type === 'data') {
        this.isPaused = false;
        this._read(); // 真正读取的方法
      }
    })
  }

  pause() {
    if (!this.isPaused) {
      this.isPaused = true;
    }
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this._read();
    }
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

  _read() {
    if (typeof this.fd !== 'number') {
      this.once('open', () => this._read());
      return;
    }

    let readLen = this.highWaterMark;
    if (this.end) {
      readLen = Math.min(this.highWaterMark, this.end - this.start);
    }

    const buffer = Buffer.alloc(readLen);

    fs.read(this.fd, buffer, 0, readLen, this.offset, (err, bytesRead, buffer) => {
      if (err) {
        this.destroy(err);
        return;
      }
      // 如果读到长度为 0, 结束
      if (bytesRead === 0) {
        this.emit('end');
        return this.destroy();
      }

      this.emit('data', buffer);
      this.offset += bytesRead;

      if (!this.isPaused) {
        this._read();
      }
    });
  }
}

export default (path: string, options?: string | RSOptions) => new ReadStream(path, options);
