var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    removeCode = require('gulp-remove-code'),
    inlinesource = require('gulp-inline-source'),
    fileinclude = require('gulp-file-include'),
    rename = require('gulp-rename');
    
var demoMode = false;

gulp.task('clean', function () {
    return del.sync(['./build/**']);
});

gulp.task('cleanDemo', function () {
    demoMode = true;
    return del.sync(['./build/**']);
});

gulp.task('removeMock', function () {
    return gulp.src('./templates/index.tpl')
        .pipe(removeCode({production: !demoMode, commentStart: '<!--', commentEnd: '-->'}))
        .pipe(gulp.dest('./build/'))
});

gulp.task('inlinesource', function () {
    var options = {
        compress: false,
        rootpath: '.'
    };
    
    var options2 = {
      basepath: '.'
    }
    
    return gulp.src('./build/index.tpl')
        .pipe(inlinesource(options))
        .pipe(fileinclude(options2))
        .pipe(gulp.dest('./build'));
});

gulp.task('rename', function () {
    return gulp.src('./build/index.tpl')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', function () {
    runSequence('clean', 
                'removeMock',
                'inlinesource', 
                'rename'
                );
});

gulp.task('demo', function () {
    runSequence('cleanDemo', 
                'removeMock',
                'inlinesource', 
                'rename');
});

// Starts watcher. Watcher runs gulp task on changes
gulp.task('watch', function () {
    gulp.watch('./src/**/*.js', ['default']);
    gulp.watch('./src/**/*.html', ['default']);
    gulp.watch('./templates/**/*.tpl', ['default']);
});

gulp.task('watchDemo', function () {
    gulp.watch('./src/**/*.js', ['demo']);
    gulp.watch('./src/**/*.html', ['demo']);
    gulp.watch('./templates/**/*.tpl', ['demo']);
});