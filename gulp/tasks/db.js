'use strict';

var gulp = require("gulp");
var config = require("../config");
var shell = require('gulp-shell');

gulp.task('db-dump', shell.task([
	"mkdir -p " + config.db.dst_dump,
	"vagrant ssh -c 'mysqldump -u" + config.db.user + " -p" + config.db.pass + " " + config.db.name + "' > " + config.db.dst_dump + "/" + config.db.name + ".sql"
], {verbose: true}));

gulp.task('db-repo-update', ['db-dump'], shell.task([
	"git add " + config.db.dst_dump + "/" + config.db.name + ".sql",
	"git commit -m 'Atualiza dump do banco de dados'"
], {verbose: true}));
