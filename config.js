module.exports = {
	paths: {
		src: "src/",
		dst: "www/wp-content/themes/tema/"
	},


	workers: {
		scripts: "browserify", // copy, browserify
		css: "less", // copy, less
		html: "copy", // copy (qualquer arquivo que esteja na raiz e nas pastas não padrões), nunjucks (arquivos .html da raiz e das pastas não padrões)
		browsersync: "http://localhost:3040", // local, Proxy URL
	},


	/*
	// Modifica a configuração padrão no gulp/config.js
	workers_path: {
		// css: { dst: "www/app/webroot/css" }
	}
	*/


	/*
	copy: [
		// src path, dst path
		//["src/templates/", "www/path/to/views/"]
	],
	*/

	/*
	proxy_mapping: [
		// local path (from root), remote path
		//["dist/scripts/", "scripts/"],
		//["dist/css/", "css/"]
	]
	*/
}
