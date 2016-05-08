var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    gulpif = require('gulp-if'),
    removeCode = require('gulp-remove-code'),
    inlinesource = require('gulp-inline-source'),
    fileinclude = require('gulp-file-include'),
    rename = require('gulp-rename');
    
gulp.task('clean', function () {
    return del.sync(['./build/**']);
});

gulp.task('inlinesource', function () {
    var options = {
        compress: false,
        rootpath: '.'
    };
    
    var options2 = {
      basepath: '.'
    }
    
    return gulp.src('./templates/index.tpl')
        .pipe(inlinesource(options))
        .pipe(fileinclude(options2))
        .pipe(gulp.dest('./build'));
});

gulp.task('rename', function () {
    return gulp.src('./build/index.tpl')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./build'));
});

gulp.task('default', function () {
    runSequence('clean', 
                'inlinesource', 
                'rename');
});
    