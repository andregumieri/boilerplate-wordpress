'use strict';

var gulp = require("gulp");
var config = require("../config");
var browserSync = require("browser-sync");
var url = require('url');
var proxy = require('proxy-middleware');
var connect = require('gulp-connect');

gulp.task('default', ['clean-dist'], function() {
	console.log("Dist is clean");
	gulp.start("default-run");
});

gulp.task('default-run', config.base.tasks.default, function() {
	var proxy_mapping = config.base.proxy_mapping;
	if(proxy_mapping.length) {
		for(var x=0; x<proxy_mapping.length; x++) {
			var urlLocal = 'http://localhost:3030/' + proxy_mapping[x][0];
			var pathRemote = '/' + proxy_mapping[x][1];

			console.log('Middleware:', urlLocal, pathRemote);

			var proxyOptions = url.parse(urlLocal); // Caminho Local
			proxyOptions.route = pathRemote; // Caminho remoto

			if(!config.middleware) config.browserSync.conf.middleware = [];
			config.browserSync.conf.middleware.push(proxy(proxyOptions));
		}

		connect.server({
			root: './',
			port: 3030
		});
	}

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
