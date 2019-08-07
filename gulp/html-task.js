const paths = require('./paths.js');
var gulp = require('gulp');
var clean = require('gulp-clean');
var pug = require('gulp-pug-i18n');

gulp.task('cleanHtml', function(){
  return gulp.src(paths.APPPATH.root + '*.html', { read: false })
    .pipe(clean())
})

gulp.task('pug', function(){
  return gulp.src(paths.SOURCEPATHS.pugSource + '*.pug')
    .pipe(pug({
      i18n: {
        locales: paths.SOURCEPATHS.dataSource + 'data.json',
        filename: '{{basename}}.html'
      },
        pretty: true
    }))
    .pipe(gulp.dest(paths.APPPATH.root))
})
