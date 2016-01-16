'use strict';

var gulp = require("gulp");
var config = require("../config");
var browserSync = require("browser-sync");

gulp.task('default', ['clean-dist'], function() {
	console.log("Dist is clean");
	gulp.start("default-run");
});

gulp.task('default-run', config.base.tasks.default, function() {
	// Inicializa o browser sync
	console.log("Inicializando o browser-sync");
	if(config.base.workers.browsersync=="local") {
		config.browserSync.conf.server = { baseDir: config.base.dst };
	} else {
		config.browserSync.conf.proxy = config.base.workers.browsersync;
	}
	browserSync.init(config.browserSync.conf);
});




gulp.task('build', ['clean-dist'], function() {
	console.log("Dist is clean");
	gulp.start("build-run");
});

gulp.task('build-run', config.base.tasks.build, function() {});
