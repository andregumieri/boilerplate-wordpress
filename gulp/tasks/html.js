'use strict';

var gulp = require("gulp");
var config = require('../config');
var nunjucksRender = require('gulp-nunjucks-render');
var prettify = require('gulp-html-prettify');
var handleErrors = require('../utils/handleErrors');
var browserSync = require("browser-sync");


function nunjucksRun(watch) {
	// Configura o ambiente do nunjucks
	nunjucksRender.nunjucks.configure([config.html.nunjucks.baseRender], { watch: watch });

	gulp.src(config.html.nunjucks.src)
		.pipe(nunjucksRender().on('error', handleErrors))
		.pipe(prettify({
			indent_char: '	',
			indent_size: 1
		}))
		.pipe(gulp.dest(config.html.nunjucks.dst))
		.pipe(browserSync.reload({stream: true}));
}


gulp.task('html-nunjucks', function() {
	nunjucksRun(false);
});


gulp.task('html-nunjucks-watch', function() {
	nunjucksRun(true);
});


gulp.task('html-copy', function() {
	gulp.src(config.html.copy.src)
		.pipe(gulp.dest(config.html.copy.dst))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('html-build-nunjucks', ['html-nunjucks'], function() {});
gulp.task('html-build-copy', ['html-copy'], function() {});

