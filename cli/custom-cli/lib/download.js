const { promisify } = require('util')
const download = promisify(require('download-git-repo'));
const ora = require('ora');

module.exports = {
  async clone(name, repourl) {
    const process = ora('下载模板中...');
    process.start();
    await download(repourl, name);
    process.succeed();
  }
}
