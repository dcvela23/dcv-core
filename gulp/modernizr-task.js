const paths = require('./paths');
var gulp = require('gulp');
var modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
  return gulp.src([paths.APPPATH.css + '**/*.css', paths.APPPATH.js + '**/*.js'])
    .pipe(modernizr({
      "options": [
        "setClasses"
      ]
    }))
    .pipe(gulp.dest(paths.APPPATH.js))
})
