var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var minifyjs = require('gulp-minify');


//////////// PATHS ////////////////
var config = {
    bootstrapDir: './bower_components/bootstrap-sass',
    publicDir: './public',
};


////////////// CSS CONVERTER //////////////////
gulp.task('css', function() {
    return gulp.src('./css/*.scss')
    .pipe(sass({
        includePaths: [config.bootstrapDir + '/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/css'));
});


/////////////// FONTS //////////////////////
gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
    .pipe(gulp.dest(config.publicDir + '/fonts'));
});


//////////////// LIVE WATCH ////////////////////
gulp.task('watch', function () {
    return watch('./css/*.scss', { ignoreInitial: false })
    	.pipe(sass({
        includePaths: [config.bootstrapDir + '/assets/stylesheets'],
    }))
        .pipe(gulp.dest(config.publicDir + '/css'));
});
 

//////////////// CALL BACK ////////////////////
gulp.task('callback', function () {
    return watch('./css/*.scss', function () {
        gulp.src('./css/*.scss')
        	.pipe(sass({
        includePaths: [config.bootstrapDir + '/assets/stylesheets'],
    }))
            .pipe(gulp.dest(config.publicDir + '/css'));
    });

});


gulp.task('minify-css', function () {
    gulp.src('./public/css/app.css')
        .pipe(minifycss({keepBreaks: true}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.publicDir + '/css'))
    ;
});

gulp.task('minify-js', function() {
  gulp.src('./js/main.js')
    .pipe(minifyjs({
        ext:{
            src:'.js',
            min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(config.publicDir + '/js'))
});


gulp.task('default', ['css', 'fonts','minify-css','minify-js','watch','callback']);