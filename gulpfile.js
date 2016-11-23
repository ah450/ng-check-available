var gulp = require('gulp');
var gulpInstall = require('gulp-install');
var mainBowerFiles = require('main-bower-files');
var fs = require('fs');
var rimraf = require('rimraf');
var scripts = require('./gulp-tasks/scripts');

gulp.task('bower-install', function() {
  // Runs bower install --production
  return gulp.src('bower.json')
    .pipe(gulpInstall({production: true, allowRoot: true}));
});

gulp.task('bower-install-dev',  function() {
  return bower()
    .pipe(gulp.dest('./bower_components'));
});


gulp.task('bower-dev', ['bower-install-dev', 'create-dirs'], function() {
  // moves main files to lib folder
  return gulp.src(mainBowerFiles({
    includeDev: 'inclusive'
  }), {base: 'bower_components'})
    .pipe(gulp.dest('libs'));
});

gulp.task('create-dirs', function() {
  var dirs = ['build', 'dist', 'libs'];
  rimraf.sync('libs');
  dirs.forEach(function(dir) {
    try {
      fs.mkdirSync(dir);
    } catch(e) {
      if (e.code != 'EEXIST') {
        throw e;
      }
    }
  });
});

gulp.task('default', ['test']);
gulp.task('build-test', ['create-dirs', 'bower-dev'], function() {
  var dependenciesStream = scripts.processDeps().pipe(concat('app-deps.js'));
  return merge([dependenciesStream]).pipe(gulp.dest('test'));
});



gulp.task('test', ['build-test'], function (done) {
  var Server = require('karma').Server;
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
