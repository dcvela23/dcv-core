const paths = require('./paths');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var usemin = require('gulp-usemin');
var htmlmin = require('gulp-htmlmin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

gulp.task('deleteDist', function(){
  return del('./dist');
})

gulp.task('copyPublic', function(){
  var pathsToCopy = [
    './app/public/**/*'
  ]
  return gulp.src(pathsToCopy)
    .pipe(gulp.dest(paths.DISTPATH.public));
})

gulp.task('usemin', ['sass', 'babel'], function(){
  return gulp.src(paths.APPPATH.root + '*.html')
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}],
      html: [ htmlmin({ collapseWhitespace: true }) ]

    }))
    .pipe(gulp.dest(paths.DISTPATH.root))
})

gulp.task('previewDist', function(){
  browserSync.init({
    notify: false,
    server: {
      baseDir: paths.DISTPATH.root
    }
  })
})

gulp.task('build', ['deleteDist'], function(){
  runSequence('deleteDist', 'copyPublic', 'usemin', 'previewDist')
})
