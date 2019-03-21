const gulp = require('gulp');
const { task } = require('gulp');


function build(cb) {
  // body omitted
  gutil.log(gutil.colors.red('切换web发布根目录：'))
  cb();
}

task(build);