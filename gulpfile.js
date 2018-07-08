// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    order = require("gulp-order"),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    livereload = require('gulp-livereload');

// HTML
gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(livereload());
});

// Styles
gulp.task('styles', function() {
    return gulp.src(['./src/styles/sass/site.scss'])
    .pipe(sass({
        style: 'compressed',
        errLogToConsole: true
    }))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleancss())
    .pipe(gulp.dest('./dist/styles'))
    .pipe(livereload())
    .pipe(notify({ message: 'Styles task complete' }));
});

// Lint
gulp.task('lint', function() {
    return gulp.src('./src/scripts/site.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'Lint task complete' }));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(['./src/scripts/**/*.js'])
    .pipe(order([
       "libs/*.js",
       "site.js"
     ]))
    .pipe(concat('site.js'))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(livereload())
    .pipe(notify({ message: 'Scripts task complete' }))
});

// Images
gulp.task('images', function() {
    return gulp.src('./src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./dist/images'))
    .pipe(livereload())
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['./dist/styles', './dist/scripts', './dist/images'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

    livereload.listen();
    gulp.watch('./**/*.html', ['html']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/images/**/*', ['images']);

});