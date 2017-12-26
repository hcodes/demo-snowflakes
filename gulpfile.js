'use strict';

const
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    fs = require('fs'),
    babel = require('rollup-plugin-babel'),
    alias = require('rollup-plugin-alias'),
    replace = require('rollup-plugin-replace');

gulp.task('js', function() {
    return gulp.src('src/demo.js')
        .pipe($.rollup({
            allowRealFiles: true,
            input: 'src/demo.js',
            format: 'iife',
            plugins: [
                alias({
                  'vue': 'node_modules/vue/dist/vue.esm.js'
                }),
                replace({
                  'process.env.NODE_ENV': JSON.stringify('production')
                }),
                babel()
            ]
        }))
        .pipe($.uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
    return gulp.src('src/*.less')
        .pipe($.less())
        .pipe($.cleancss())
        .pipe($.autoprefixer({
            browsers: ['ie >= 10', 'Firefox >= 24', 'Chrome >= 26', 'iOS >= 6', 'Safari >= 6', 'Android > 4.0']
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch('src/**/*', ['default']);
});

gulp.task('default', ['js', 'css']);
