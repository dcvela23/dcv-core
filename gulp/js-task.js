const paths = require('./paths');
var clean = require('gulp-clean');
var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('cleanScripts', function(){
  return gulp.src(paths.APPPATH.js + '*.js', { read: false })
    .pipe(clean())
});

gulp.task('babel', function(){
  var b = browserify({
    entries: paths.SOURCEPATHS.jsSource + 'main.js',
    debug: true,
    transform: [babelify.configure({
      presets: ['es2015']
    })]
  });
  return b.bundle()
      .on('error', function (err) {
        console.log(err.toString());

         this.emit('end');
      })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.APPPATH.js));
})
