var gulp = require('gulp');
var order = require('gulp-order');

function processDeps() {
  var libs =  gulp.src('libs/**/*.js')
      .pipe(order([
        'libs/angular/*.js',
        'libs/**/*.js',
        ], { base: './'}));
  return libs;
}

exports.processDeps = processDeps;
