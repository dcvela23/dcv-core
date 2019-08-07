const paths = require('./paths.js');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
  return gulp.src('./src/scss/app.scss')
        .pipe(autoprefixer())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(paths.APPPATH.css))
});

gulp.task('cssInject', function(){
  return gulp.src(paths.APPPATH.css)
    .pipe(browserSync.stream());
})
