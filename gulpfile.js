var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');


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


gulp.task('default', ['watch','callback','css', 'fonts']);