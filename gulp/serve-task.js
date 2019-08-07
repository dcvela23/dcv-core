const paths = require('./paths');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve', ['pug'], function(){
  browserSync.init(
    [paths.APPPATH.css + '/*.css', paths.APPPATH.root + '/*.html'],
    {
      server: {
        baseDir: paths.APPPATH.root
      }
    }
  )
});
