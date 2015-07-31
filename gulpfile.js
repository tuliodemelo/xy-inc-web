// Instanciando módulos
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    minifycss = require('gulp-minify-css');

// Styles
gulp.task('styles', function() {
  return gulp
        .src('app/css/src/app.css')
        .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/css'));
    
});

// Scripts
gulp.task('scripts', function() {
    return gulp
           .src(['app/js/src/**/*.js'])
           .pipe(uglify())
           .pipe(rename({suffix: '.min'}))
           .pipe(gulp.dest('app/js'));
});

// Default task
gulp.task('default', function() {
    gulp.start('styles','scripts');
});