'use strict';

var gulp = require("gulp");
var config = require('../config');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var handleErrors = require('../utils/handleErrors');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require("browser-sync");
var fs = require("fs");
var path = require('path');
var shell = require('gulp-shell');



gulp.task('scripts-browserify', function() {
	var files = fs.readdirSync(config.scripts.srcPath);
	for(var x=0; x<files.length; x++) {
		if(path.extname(files[x])!='.js') continue;

		var src = config.scripts.srcPath + '/' + files[x];
		var arrPath = src.split('/');

		browserify(src)
			.bundle()
			.on('error', handleErrors)
			.pipe(source(arrPath[arrPath.length-1]))
			.pipe(gulp.dest(config.scripts.dst))
			.pipe(browserSync.reload({stream: true}));

	}
});


gulp.task('scripts-copy', function() {
	gulp.src(config.scripts.src)
		.pipe(gulp.dest(config.scripts.dst))
		.pipe(browserSync.reload({stream: true}));
});




gulp.task('scripts-build-browserify', function() {
	var files = fs.readdirSync(config.scripts.srcPath);
	for(var x=0; x<files.length; x++) {
		if(path.extname(files[x])!='.js') continue;

		var src = config.scripts.srcPath + '/' + files[x];
		var arrPath = src.split('/');

		browserify(src)
			.bundle()
			.on('error', handleErrors)
			.pipe(source(arrPath[arrPath.length-1]))
			.pipe(gulp.dest(config.scripts.dst))
	}
});


gulp.task('scripts-build-copy', function() {
	gulp.src(config.scripts.src)
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.dst))
});

gulp.task('scripts-documentation', shell.task(['./node_modules/jsdoc/jsdoc.js ' + config.scripts.srcPath + ' -d ' + config.scripts.docs + ' -r'], {verbose: true}));
