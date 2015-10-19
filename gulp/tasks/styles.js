'use strict';

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var seq = require('sequence-stream');
var cssGlobbing = require('gulp-css-globbing');


gulp.task('styles', function(){

    var compile = gulp.src(['client/scss/core.scss'], {base: 'app'})
        .pipe(cssGlobbing({
            extensions : ['.scss']
        }))
        .pipe(sass());

    var assets = gulp.src([
        'client/vendors/bootstrap/dist/css/bootstrap.css',
        'client/vendors/components-font-awesome/css/font-awesome.css',
        'client/vendors/toastr/toastr.css'
    ])
        .pipe(concat('assets.css'));

    // Combine all the streams
    return seq([assets, compile])
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());

});
