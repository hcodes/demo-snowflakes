'use strict';

const
    gulp = require('gulp'),
    alias = require('@rollup/plugin-alias'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    babel = require('rollup-plugin-babel'),
    replace = require('rollup-plugin-replace'),
    postcss = require('gulp-postcss'),
    less = require('gulp-less'),
    rollup = require('gulp-rollup'),
    uglify = require('gulp-uglify');

gulp.task('js', function js() {
    return gulp.src(['src/**/*.js', 'node_modules/vue/dist/**/*.js'])
        .pipe(rollup({
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
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', function css() {
    return gulp.src('src/index.less')
        .pipe(less())
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', gulp.series('js', 'css'));
