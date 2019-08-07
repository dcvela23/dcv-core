var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
const paths = require('./gulp/paths.js');
//import all tasks
var pug = require('./gulp/html-task.js');
var cleanHtml = require('./gulp/html-task.js');
var sass = require('./gulp/css-task.js');
var serve = require('./gulp/serve-task.js');
var babel = require('./gulp/js-task.js');
var cleanScripts = require('./gulp/js-task.js');
var cleanImages = require('./gulp/image-task.js');
var images = require('./gulp/image-task.js');
var imagesProd = require('./gulp/image-task.js');
var icons = require('./gulp/icon-task.js');
var cleanIcons = require('./gulp/icon-task.js');
var build = require('./gulp/build-task.js');
var modernizr = require('./gulp/modernizr-task.js');

//
gulp.task('init-dev', function(){
  runSequence('cleanIcons', 'cleanImages', 'cleanHtml', 'cleanScripts', 'pug', 'icons', 'sass', 'babel', 'modernizr', 'images', 'serve')
})

gulp.task('watch-dev', ['init-dev'], function(){
  gulp.watch(
    [paths.SOURCEPATHS.pugSource + '**/**/*'],
    function(){
      runSequence('cleanHtml', 'pug');
      reload();
    }
  );
  gulp.watch(
    [paths.SOURCEPATHS.sassSource + '**/**/*'],
    function(){ runSequence('sass') }
  );
  gulp.watch(
    [paths.SOURCEPATHS.jsSource + '**/**/*'],
    function(){
      runSequence('cleanScripts', 'babel');
      reload();
    }
  );
  gulp.watch(
    [paths.SOURCEPATHS.imageSource + '**/**/*'],
    function(){
      runSequence('cleanImages', 'images');
      reload();
    }
  );
  gulp.watch(
    [paths.SOURCEPATHS.iconSource + '**/**/*'],
    function(){
      runSequence('cleanIcons', 'icons');
      reload();
    }
  );
})

//
gulp.task('init-build', function(){
  runSequence('cleanIcons', 'cleanImages', 'cleanHtml', 'cleanScripts', 'sass', 'pug', 'babel', 'modernizr', 'images', 'icons', 'build', 'imagesProd')
})
