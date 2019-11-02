'use strict';

const
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    alias = require('@rollup/plugin-alias'),
    babel = require('rollup-plugin-babel'),
    replace = require('rollup-plugin-replace');

gulp.task('js', function js() {
    return gulp.src(['src/**/*.js', 'node_modules/vue/dist/**/*.js'])
        .pipe($.rollup({
            input: 'src/index.js',
            output: { format: 'iife' },
            plugins: [
                alias({
                    entries: {
                        'vue': 'node_modules/vue/dist/vue.esm.js'
                    }
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

gulp.task('css', function css() {
    return gulp.src('src/index.less')
        .pipe($.less())
        .pipe($.cleancss())
        .pipe($.autoprefixer())
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', gulp.series('js', 'css'));
