'use strict';

var Config = require("../config.js");

var src = './' + Config.paths.src;
var dst = './' + Config.paths.dst;

module.exports = {
	/**
	 * base
	 * Configurações basicas para qualquer task
	 *
	 * src: Pasta base do source (sempre usar a variavel global src)
	 * dst: Pasta base do destino (sempre usar a variavel global dst)
	 * tasks: Arrays das tasks do default.js que devem ser rodadas no Gulp
	 */
	base: {
		src: src,
		dst: dst,

		workers: Config.workers,

		tasks: {
			default: [
				'images',
				'copy',
				'html-'+Config.workers.html,
				'css-'+Config.workers.css,
				'scripts-'+Config.workers.scripts,
				'vendor',
				'watch'
			],

			build: [
				'images-build',
				'copy-build',
				'html-build-'+Config.workers.html,
				'css-build-'+Config.workers.css,
				'scripts-build-'+Config.workers.scripts,
				'vendor-build',
			]
		}
	},


	/**
	 * copy
	 * Configurações referentes aos arqivos que é só copiar do src para o dst
	 *
	 * watch: Arquivos que devem ser monitorados
	 * actions[].src: Sources dos arquivos
	 * actions[].dst: Destino dos arquivos
	 */
	copy: {
		watch: [src+'/files/**/*.*', '!'+src+'/files/**/.DS_Store', '!'+src+'/files/images/**/*.*'],
		actions: [{
			src: [src+'/files/**/*.*', '!'+src+'/files/**/.DS_Store', '!'+src+'/files/images/**/*.*'],
			dst: dst+'/files',
			dstDel: [dst+'/files/**/*.*', '!'+dst+'/files/images/**/*.*']
		}]
	},


	/**
	 * less
	 * Configurações relativas ao less
	 *
	 * src: Sources dos arquivos
	 * watch: Arquivos que devem ser monitorados
	 * dst: Destino dos arquivos
	 */
	css: {
		less: {
			src: [src+'/css/**/*.less', '!'+src+'/css/inc/**/*.*'],
			watch: src+'/css/**/*.less',
			dst: dst+'/css'
		},
		copy: {
			src: [src+'/css/**/*.css', '!'+src+'/css/inc/**/*.*'],
			watch: src+'/css/**/*.css',
			dst: dst+'/css'
		}

	},


	/**
	 * scripts
	 * Configurações relativas à scripts e browserify
	 *
	 * src: Sources dos arquivos
	 * watch: Arquivos que devem ser monitorados
	 * dst: Destino dos arquivos
	 * browserify.bundles: Lista de cada arquivo inicial que deve ser compilado
	 */
	scripts: {
		srcPath: src+'/scripts',
		src: src+'/scripts/**/*.js',
		watch: src+'/scripts/**/*.js',
		dst: dst+'/scripts',
		docs: './docs'
	},


	/**
	 * vendor
	 * Configurações relativas ao scripts do vendor
	 *
	 * bundle: Sources dos arquivos
	 * dst: Destino dos arquivos
	 * dstFileName: Nome do arquivo no destino
	 */
	vendor: {
		watch: src+'/vendor/vendor.json',
		dst: dst+'/vendor',
		src: src+'/vendor'
	},


	/**
	 * images
	 * Configurações relativas a task images
	 *
	 * src: Sources dos arquivos
	 * watch: Arquivos que devem ser monitorados
	 * dst: Destino dos arquivos
	 */
	images: {
		src: src+'/images/**/*.*',
		watch: src+'/images/**/*.*',
		dst: dst+'/images'
	},


	/**
	 * html
	 * Configurações relativas a task do nunjucks
	 *
	 * baseRender: Configuração do nunjucks-render para determinar a base dos templates
	 * src: Sources dos arquivos
	 * watch: Arquivos que devem ser monitorados
	 * dst: Destino dos arquivos
	 */
	html: {
		nunjucks: {
			baseRender: src+'/',
			src: [src+'/**/*.html', '!'+src+'/html-parts/**/*', '!'+src+'/files/**/*', '!'+src+'/scripts/**/*', '!'+src+'/css/**/*', '!'+src+'/vendor/**/*'],
			watch: src+'/**/*.html',
			dst: dst
		},

		copy: {
			src: [src+'/**/*.*', '!'+src+'/html-parts/**/*', '!'+src+'/files/**/*', '!'+src+'/scripts/**/*', '!'+src+'/css/**/*', '!'+src+'/vendor/**/*'],
			dst: dst
		}


	},


	/**
	 * browserSync
	 * Configurações do browser sync
	 * @link http://www.browsersync.io/
	 *
	 * conf: Objeto de configurações direto do Browser Sync
	 */
	browserSync: {
		conf: {
			open: false
		}
	},


	/**
	 * db
	 * Configurações de DB
	 */
	db: {
		dst_dump: './xtras/db',
		user: 'root',
		pass: 'root',
		name: 'quist2016'
	}
}
