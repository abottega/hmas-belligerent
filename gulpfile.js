'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var htmlclean = require('gulp-htmlclean');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var del = require('del');
var sass = require('gulp-sass');

// gulpfile.js
var gulp = require('gulp');
var paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/css/styles.scss',
  srcJS: 'src/js/**/*.js',
  srcIMG: 'src/img/**/*',

  tmp: 'tmp',
  tmpIndex: 'tmp/**/*.html',
  tmpCSS: 'tmp/css/',
  tmpJS: 'tmp/js/',
  tmpIMG: 'tmp/img/',

  dist: 'dist',
  distIndex: 'dist/',
  distCSS: 'dist/css/',
  distJS: 'dist/js/',
  distIMG: 'dist/img/'
};

gulp.task('html', function () {
  return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
});

gulp.task('css', function () {
  return gulp.src(paths.srcCSS)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.tmpCSS));
});

gulp.task('js', function () {
  return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmpJS));
});

gulp.task('img', function () {
  return gulp.src(paths.srcIMG).pipe(gulp.dest(paths.tmpIMG));
});

gulp.task('copy', ['html', 'css', 'js', 'img']);

gulp.task('inject', ['copy'], function () {
  var css = gulp.src(paths.tmpCSS + "styles.css");
  var js = gulp.src(paths.tmpJS + "scripts.js");
  return gulp.src(paths.tmpIndex)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( js, { relative:true } ))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('serve', ['inject'], function () {
  return gulp.src(paths.tmp)
    .pipe(webserver({
      port: 3030,
      livereload: true
    }));
});

gulp.task('watch', ['serve'], function () {
  gulp.watch(paths.src, ['inject']);
});

gulp.task('default', ['watch']);

//Clean tmp and dist folders
gulp.task('clean', function () {
  del([paths.tmp, paths.dist]);
});

// Build dist tasks
gulp.task('html:dist', function () {
  return gulp.src(paths.srcHTML)
    .pipe(htmlclean())
    .pipe(gulp.dest(paths.dist));
});
gulp.task('css:dist', function () {
  return gulp.src(paths.srcCSS)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.distCSS));
});
gulp.task('js:dist', function () {
  return gulp.src(paths.srcJS)
    .pipe(uglify())
    .pipe(gulp.dest(paths.distJS));
});
gulp.task('img:dist', function () {
  return gulp.src(paths.srcIMG)
    .pipe(gulp.dest(paths.distIMG));
});

gulp.task('copy:dist', ['html:dist', 'css:dist', 'js:dist', 'img:dist']);

gulp.task('inject:dist', ['copy:dist'], function () {
  var css = gulp.src(paths.distCSS);
  var js = gulp.src(paths.distJS);
  return gulp.src(paths.distIndex)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( js, { relative:true } ))
    .pipe(gulp.dest(paths.dist));
});
gulp.task('build', ['inject:dist']);