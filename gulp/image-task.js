const paths = require('./paths');
var gulp = require('gulp');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');

gulp.task('cleanImages', function(){
  return gulp.src(paths.APPPATH.images + '/**/*.{jpg,png,gif,ico,svg}', {read: false, force:true })
    .pipe(clean());
})

gulp.task('images', function(){
  gulp.src(paths.SOURCEPATHS.imageSource + '/**/*.{jpg,png,gif,ico,svg}')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(gulp.dest(paths.APPPATH.images));
});

gulp.task('imagesProd', function(){
  gulp.src(paths.SOURCEPATHS.imageSource + '/**/*.{jpg,png,gif,ico,svg}')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(gulp.dest(paths.DISTPATH.images));
});
