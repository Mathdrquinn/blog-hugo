var fs = require('fs');
console.log('------ base-app ------');
console.log('./gulpfile.js: ', fs.existsSync('./gulpfile.js'));
console.log('__dirname: ', __dirname);
console.log('process.cwd(): ', process.cwd());

var gulp = require('gulp');
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename');

gulp.task('sass', function() {
    return sass('Dev/scss', { style: 'expanded' })
        .pipe(gulp.dest('static/css'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
	    .pipe(gulp.dest('static/css'))
	    .pipe(rename({suffix: '.min'}))
	    .pipe(minifycss())
	    .pipe(gulp.dest('static/css'));
});

gulp.task('watch', function() {
  gulp.watch('Dev/scss/**/*.scss', ['sass']);
});


gulp.task('default', ['sass', 'watch'], function() {

});
