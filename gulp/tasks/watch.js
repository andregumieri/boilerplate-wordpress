'use strict';

var _watchImagesShouldClean, _watchImagesTimeout, _watchCopyShouldClean, _watchCopyTimeout;


var gulp = require("gulp");
var config = require('../config');
var watch = require("gulp-watch");
var browserSync = require("browser-sync");
var fs = require("fs");

gulp.task('watch', function() {
	// SASS

	if(config.base.workers.css=="less") {
		watch(config.css.less.watch, function() {
			gulp.start("css-less");
		});
	} else if(config.base.workers.css=="copy") {
		watch(config.css.copy.watch, function() {
			gulp.start("css-copy");
		});
	}

	// SCRIPTS
	watch(config.scripts.watch, function() {
		gulp.start("scripts-"+config.base.workers.scripts);
		gulp.start("scripts-documentation");
	});

	// IMAGES
	watch(config.images.watch, function(e) {
		clearTimeout(_watchImagesTimeout);
		if(!fs.existsSync(e.path)) _watchImagesShouldClean = true;

		// Evita o acumulo de cópias que pode travar o GULP
		_watchImagesTimeout = setTimeout(function() {
			var acao = _watchImagesShouldClean===true ? "images-clean" : "images";
			gulp.start(acao);
			_watchImagesShouldClean = false;
		}, 500);
	});


	// HTML
	if(config.base.workers.html=="nunjucks") {
		watch(config.html.nunjucks.watch, function() {
			gulp.start("html-nunjucks-watch");
		});
	} else if(config.base.workers.html=="copy") {
		watch(config.html.copy.src, function() {
			gulp.start("html-copy");
		});
	}



	// NUNJUCKS
	watch(config.vendor.watch, function() {
		gulp.start("vendor");
	});


	// COPY STATIC FILES
	watch(config.copy.watch, function(e) {
		clearTimeout(_watchCopyTimeout);
		if(!fs.existsSync(e.path)) _watchCopyShouldClean = true;

		// Evita o acumulo de cópias que pode travar o GULP
		_watchCopyTimeout = setTimeout(function() {
			var acao = _watchCopyShouldClean===true ? "copy-clean" : "copy";
			gulp.start(acao);
			_watchCopyShouldClean = false;
		}, 500);
	});
});
