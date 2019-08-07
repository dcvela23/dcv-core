const paths = require('./paths');
var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var clean = require('gulp-clean');

var config = {
    mode: {
      symbol: true ,// Activate the «symbol» mode,
      css: { // Activate the «css» mode
        render: {
          css: true // Activate CSS output (with default options)
        }
      }
    }
  };

gulp.task('cleanIcons', function(){
  return gulp.src(paths.APPPATH.icons + '**/**/*', { read: false })
    .pipe(clean())
})

gulp.task('icons', function(){
  return gulp.src('**/*.svg', { cwd: paths.SOURCEPATHS.iconSource } )
    .pipe(svgSprite(config))
    .pipe(gulp.dest(paths.APPPATH.icons));
})
