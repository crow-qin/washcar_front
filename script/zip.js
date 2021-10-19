/* eslint-disable */
const chalk = require('chalk');
const path = require('path');
const archiver = require('archiver');
const fs = require('fs');
const root = path.resolve(__dirname, '../');

console.log(chalk.green(`root path :${root}`));
const filePath = path.join(__dirname, '../', 'dist.zip');
console.log(filePath);
function delFile() {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      console.log('test-err', err);
      if (!err) {
        console.log(chalk.yellow('存在该压缩包'));
        fs.unlink(filePath, (err) => {
          if (err) {
            reject(err)
          }
          console.log(chalk.yellow('已删除该压缩包'));
          resolve();
        })
      } else {
        resolve();
      }
    })
  })
}
async function zipFile() {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', {
      zlib: {
        level: 5,
      },
    }).on('error', (err) => {
      console.log('archive err', err)
      reject(err);
    });
    const output = fs.createWriteStream(`${root}/dist.zip`)
      .on('close', (err) => {
        if (err) {
          reject(err);
        }
        console.log(chalk.yellow('完成文件的归档'));
        resolve();
      });
    archive.pipe(output);
    archive.directory(path.join(root, '/dist'), '/');
    archive.finalize();
  });
}
delFile()
  // .then(() => zipFile())
  .then(()=> {
    console.log(chalk.yellow('finish'));
    process.exit(0);
  })
  .catch((e) => {
    console.log(chalk.red('err', e));
  })