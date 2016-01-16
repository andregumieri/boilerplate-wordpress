'use strict';

var gulp = require("gulp");
var less = require("gulp-less");
var sourcemaps = require('gulp-sourcemaps');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({browsers: ["> 5% in BR", "ie >= 9", "not ie < 9"]});
var config = require('../config');
var handleErrors = require('../utils/handleErrors');
var browserSync = require("browser-sync");


gulp.task('css-less', function() {
	gulp.src(config.css.less.src)
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [autoprefix]
		}).on('error', handleErrors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.css.less.dst))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('css-copy', function() {
	gulp.src(config.css.copy.src)
		.pipe(gulp.dest(config.css.copy.dst))
});


gulp.task('css-build-less', function() {
	gulp.src(config.css.less.src)
		.pipe(less({
			plugins: [autoprefix],
			outputStyle: 'compressed'
		}).on('error', handleErrors))
		.pipe(gulp.dest(config.css.less.dst));
});

gulp.task('css-build-copy', ['css-copy'], function() {});
